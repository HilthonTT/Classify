using ClassifyApi.Commands.Items;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;
using Action = ClassifyApi.Library.Models.Action;

namespace ClassifyApi.Handlers.Items;

public class SoftDeleteItemHandler : IRequestHandler<SoftDeleteItemCommand, Item?>
{
    private readonly IItemData _itemData;
    private readonly IActivityLogData _activityLogData;

    public SoftDeleteItemHandler(IItemData itemData, IActivityLogData activityLogData)
    {
        _itemData = itemData;
        _activityLogData = activityLogData;
    }

    public async Task<Item?> Handle(SoftDeleteItemCommand request, CancellationToken cancellationToken)
    {
        Item? item = await _itemData.GetByIdAsync(request.Id);
        if (item is null || item.OrgId.Equals(request.User.OrgId) is false)
        {
            return null;
        }

        item.Deleted = true;

        Item updatedItem = await _itemData.UpdateAsync(item);

        ActivityLog log = new()
        {
            OrgId = request.User.OrgId!,
            EntityId = updatedItem.Id,
            EntityType = EntityType.Item,
            Action = Action.Delete,
            UserId = request.User.Id,
            UserImage = request.User.ImageUrl,
            Username = request.User.FullName,
            Message = $"{request.User.FullName} soft deleted item {updatedItem.Name}",
        };

        await _activityLogData.CreateActivityLogAsync(log);

        return updatedItem;
    }
}
