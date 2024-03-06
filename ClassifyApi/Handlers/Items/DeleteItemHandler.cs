using ClassifyApi.Commands.Items;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Handlers.Items;

public class DeleteItemHandler : IRequestHandler<DeleteItemCommand, Item?>
{
    private readonly IItemData _itemData;

    public DeleteItemHandler(IItemData itemData)
    {
        _itemData = itemData;
    }

    public async Task<Item?> Handle(DeleteItemCommand request, CancellationToken cancellationToken)
    {
        Item? item = await _itemData.GetByIdAsync(request.Id);
        if (item == null || item.OrgId.Equals(request.OrgId) is false)
        {
            return null;
        }

        Item deletedItem = await _itemData.DeleteAsync(item);

        return deletedItem;
    }
}
