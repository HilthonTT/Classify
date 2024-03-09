using ClassifyApi.Commands.Folders;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;
using Action = ClassifyApi.Library.Models.Action;

namespace ClassifyApi.Handlers.Folders;

public class CreateFolderHandler : IRequestHandler<CreateFolderCommand, Folder>
{
    private readonly IFolderData _folderData;
    private readonly IActivityLogData _activityLogData;

    public CreateFolderHandler(IFolderData folderData, IActivityLogData activityLogData)
    {
        _folderData = folderData;
        _activityLogData = activityLogData;
    }

    public async Task<Folder> Handle(CreateFolderCommand request, CancellationToken cancellationToken)
    {
        Folder folder = new()
        {
            OrgId = request.User.OrgId!,
            Name = request.Name,
            Notes = request.Notes,
        };

        Folder createdFolder = await _folderData.CreateFolderAsync(folder);

        ActivityLog log = new()
        {
            OrgId = request.User.OrgId!,
            EntityId = createdFolder.Id,
            EntityType = EntityType.Folder,
            UserId = request.User.Id,
            Action = Action.Create,
            UserImage = request.User.ImageUrl,
            Username = request.User.FullName,
            Message = $"{request.User.FullName} created folder {createdFolder.Name}",
        };

        await _activityLogData.CreateActivityLogAsync(log);

        return createdFolder;
    }
}
