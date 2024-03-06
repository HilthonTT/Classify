using ClassifyApi.Commands.Items;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Handlers.Items;

public class SoftDeleteItemHandler : IRequestHandler<SoftDeleteItemCommand, Item?>
{
    private readonly IItemData _itemData;

    public SoftDeleteItemHandler(IItemData itemData)
    {
        _itemData = itemData;
    }

    public async Task<Item?> Handle(SoftDeleteItemCommand request, CancellationToken cancellationToken)
    {
        Item? item = await _itemData.GetByIdAsync(request.Id);
        if (item is null || item.OrgId.Equals(request.OrgId) is false)
        {
            return null;
        }

        item.Deleted = true;

        Item updatedItem = await _itemData.UpdateAsync(item);

        return updatedItem;
    }
}
