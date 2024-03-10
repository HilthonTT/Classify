using ClassifyApi.Commands.Items;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;
using Action = ClassifyApi.Library.Models.Action;

namespace ClassifyApi.Handlers.Items;

public class MoveFolderHandler : IRequestHandler<MoveFolderCommand, Item?>
{
    private readonly IFolderData _folderData;
    private readonly IItemData _itemData;
    private readonly IActivityLogData _activityLogData;

    public MoveFolderHandler(
        IFolderData folderData,
        IItemData itemData,
        IActivityLogData activityLogData)
    {
        _folderData = folderData;
        _itemData = itemData;
        _activityLogData = activityLogData;
    }

    public async Task<Item?> Handle(MoveFolderCommand request, CancellationToken cancellationToken)
    {
        Folder? folder = await _folderData.GetFolderByIdAsync(request.FolderId);
        if (folder is null || folder.OrgId.Equals(request.User.OrgId) is false)
        {
            return null;
        }

        Item? item = await _itemData.GetByIdAsync(request.ItemId);
        if (item is null || item.OrgId.Equals(request.User.OrgId) is false)
        {
            return null;
        }

        item.FolderId = folder.Id;
        Item updatedItem = await _itemData.UpdateAsync(item);

        ActivityLog log = new()
        {
            OrgId = request.User.OrgId!,
            EntityId = updatedItem.Id,
            EntityType = EntityType.Item,
            Action = Action.Move,
            UserId = request.User.Id,
            UserImage = request.User.ImageUrl,
            Username = request.User.FullName,
            Message = $"{request.User.FullName} moved item \"{updatedItem.Name}\" to folder \"{folder.Name}\"",
            Reason = request.Notes,
        };

        await _activityLogData.CreateActivityLogAsync(log);

        return updatedItem;
    }
}
