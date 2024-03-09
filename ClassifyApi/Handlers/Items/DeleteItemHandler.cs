using ClassifyApi.Commands.Items;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;
using Action = ClassifyApi.Library.Models.Action;

namespace ClassifyApi.Handlers.Items;

public class DeleteItemHandler : IRequestHandler<DeleteItemCommand, Item?>
{
    private readonly IItemData _itemData;
    private readonly IActivityLogData _activityLogData;

    public DeleteItemHandler(IItemData itemData, IActivityLogData activityLogData)
    {
        _itemData = itemData;
        _activityLogData = activityLogData;
    }

    public async Task<Item?> Handle(DeleteItemCommand request, CancellationToken cancellationToken)
    {
        Item? item = await _itemData.GetByIdAsync(request.Id);
        if (item == null || item.OrgId.Equals(request.User.OrgId) is false)
        {
            return null;
        }

        Item deletedItem = await _itemData.DeleteAsync(item);

        ActivityLog log = new()
        {
            OrgId = request.User.OrgId!,
            EntityId = deletedItem.Id,
            EntityType = EntityType.Item,
            Action = Action.Delete,
            UserId = request.User.Id,
            UserImage = request.User.ImageUrl,
            Username = request.User.FullName,
            Message = $"{request.User.FullName} deleted item \"{deletedItem.Name}\"",
        };

        await _activityLogData.CreateActivityLogAsync(log);

        return deletedItem;
    }
}
