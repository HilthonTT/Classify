using ClassifyApi.Commands.Items;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Handlers.Items;

public class UpdateItemHandler : IRequestHandler<UpdateItemCommand, Item?>
{
    private readonly IItemData _itemData;

    public UpdateItemHandler(IItemData itemData)
    {
        _itemData = itemData;
    }

    public async Task<Item?> Handle(UpdateItemCommand request, CancellationToken cancellationToken)
    {
        Item? item = await _itemData.GetByIdAsync(request.Id);
        if (item is null || item.OrgId.Equals(request.OrgId) is false)
        {
            return null;
        }

        item.Name = request.Name ?? item.Name;
        item.ImageUrl = request.ImageUrl ?? item.ImageUrl;
        item.Quantity = request.Quantity;
        item.MinimumLevel = request.MinimumLevel;
        item.Price = request.Price;

        Item updatedItem = await _itemData.UpdateAsync(item);

        return updatedItem;
    }
}
