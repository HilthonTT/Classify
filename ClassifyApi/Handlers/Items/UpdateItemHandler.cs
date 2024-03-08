using ClassifyApi.Commands.Items;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;
using Action = ClassifyApi.Library.Models.Action;

namespace ClassifyApi.Handlers.Items;

public class UpdateItemHandler : IRequestHandler<UpdateItemCommand, Item?>
{
    private readonly IItemData _itemData;
    private readonly IActivityLogData _activityLogData;

    public UpdateItemHandler(IItemData itemData, IActivityLogData activityLogData)
    {
        _itemData = itemData;
        _activityLogData = activityLogData;
    }

    public async Task<Item?> Handle(UpdateItemCommand request, CancellationToken cancellationToken)
    {
        Item? item = await _itemData.GetByIdAsync(request.Id);
        if (item is null || item.OrgId.Equals(request.User.OrgId) is false)
        {
            return null;
        }

        item.Name = request.Name ?? item.Name;
        item.ImageUrl = request.ImageUrl ?? item.ImageUrl;
        item.Quantity = request.Quantity;
        item.MinimumLevel = request.MinimumLevel;
        item.Price = request.Price;
        item.Deleted = request.Deleted ?? item.Deleted;

        Item updatedItem = await _itemData.UpdateAsync(item);

        ActivityLog log = new()
        {
            OrgId = request.User.OrgId!,
            EntityId = updatedItem.Id,
            EntityType = EntityType.Item,
            Action = Action.Update,
            UserId = request.User.Id,
            UserImage = request.User.ImageUrl,
            Username = request.User.FullName,
            Message = $"{request.User.FullName} updated item {updatedItem.Name}",
        };

        await _activityLogData.CreateActivityLogAsync(log);

        return updatedItem;
    }
}
