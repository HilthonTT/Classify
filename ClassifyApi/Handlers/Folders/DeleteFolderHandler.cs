using ClassifyApi.Commands.Folders;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;
using Action = ClassifyApi.Library.Models.Action;

namespace ClassifyApi.Handlers.Folders;

public class DeleteFolderHandler : IRequestHandler<DeleteFolderCommand, Folder?>
{
    private readonly IFolderData _folderData;
    private readonly IActivityLogData _activityLogData;

    public DeleteFolderHandler(IFolderData folderData, IActivityLogData activityLogData)
    {
        _folderData = folderData;
        _activityLogData = activityLogData;
    }

    public async Task<Folder?> Handle(DeleteFolderCommand request, CancellationToken cancellationToken)
    {
        Folder? folder = await _folderData.GetFolderByIdAsync(request.Id);
        if (folder is null || folder.OrgId.Equals(request.User.OrgId) is false)
        {
            return null;
        }

        Folder deletedFolder = await _folderData.DeleteFolderAsync(folder);

        ActivityLog log = new()
        {
            OrgId = request.User.OrgId!,
            EntityId = deletedFolder.Id,
            EntityType = EntityType.Item,
            Action = Action.Delete,
            UserId = request.User.Id,
            UserImage = request.User.ImageUrl,
            Username = request.User.FullName,
            Message = $"{request.User.FullName} deleted folder {deletedFolder.Name}",
        };

        await _activityLogData.CreateActivityLogAsync(log);

        return deletedFolder;
    }
}
