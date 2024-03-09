using ClassifyApi.Commands.Folders;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;
using Action = ClassifyApi.Library.Models.Action;

namespace ClassifyApi.Handlers.Folders;

public class SoftDeleteFolderHandler : IRequestHandler<SoftDeleteFolderCommand, Folder?>
{
    private readonly IFolderData _folderData;
    private readonly IActivityLogData _activityLogData;

    public SoftDeleteFolderHandler(IFolderData folderData, IActivityLogData activityLogData)
    {
        _folderData = folderData;
        _activityLogData = activityLogData;
    }

    public async Task<Folder?> Handle(SoftDeleteFolderCommand request, CancellationToken cancellationToken)
    {
        Folder? folder = await _folderData.GetFolderByIdAsync(request.Id);
        if (folder == null || folder.OrgId.Equals(request.User.OrgId) is false)
        {
            return null;
        }

        folder.Deleted = true;
        folder.DateDeleted = DateTime.UtcNow;

        Folder deletedFolder = await _folderData.UpdateFolderAsync(folder);

        ActivityLog log = new()
        {
            OrgId = request.User.OrgId!,
            EntityId = deletedFolder.Id,
            EntityType = EntityType.Folder,
            Action = Action.Trash,
            UserId = request.User.Id,
            UserImage = request.User.ImageUrl,
            Username = request.User.FullName,
            Message = $"{request.User.FullName} moved folder \"{deletedFolder.Name}\" to trash",
        };

        await _activityLogData.CreateActivityLogAsync(log);

        return deletedFolder;
    }
}
