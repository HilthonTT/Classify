using ClassifyApi.Commands.Items;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Handlers.Items;

public class CreateItemHandler : IRequestHandler<CreateItemCommand, Item>
{
    private readonly IItemData _itemData;

    public CreateItemHandler(IItemData itemData)
    {
        _itemData = itemData;
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
            OrgId = request.OrgId
        };

        Item createdItem = await _itemData.CreateAsync(item);

        return createdItem;
    }
}
