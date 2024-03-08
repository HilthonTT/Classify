using ClassifyApi.Commands.Items;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;
using Action = ClassifyApi.Library.Models.Action;

namespace ClassifyApi.Handlers.Items;

public class CreateItemHandler : IRequestHandler<CreateItemCommand, Item>
{
    private readonly IItemData _itemData;
    private readonly IActivityLogData _activityLogData;

    public CreateItemHandler(IItemData itemData, IActivityLogData activityLogData)
    {
        _itemData = itemData;
        _activityLogData = activityLogData;
    }

    public async Task<Item> Handle(CreateItemCommand request, CancellationToken cancellationToken)
    {
        Item item = new()
        {
            Name = request.Name,
            ImageUrl = request.ImageUrl,
            Quantity = request.Quantity,
            MinimumLevel = request.MinimumLevel,
            Price = request.Price,
            OrgId = request.User.OrgId!
        };

        Item createdItem = await _itemData.CreateAsync(item);

        ActivityLog log = new()
        {
            OrgId = request.User.OrgId!,
            EntityId = createdItem.Id,
            EntityType = EntityType.Item,
            Action = Action.Create,
            UserId = request.User.Id,
            UserImage = request.User.ImageUrl,
            Username = request.User.FullName,
            Message = $"{request.User.FullName} created item {createdItem.Name}",
        };

        await _activityLogData.CreateActivityLogAsync(log);

        return createdItem;
    }
}
