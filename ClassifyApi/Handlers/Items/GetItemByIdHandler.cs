using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Items;
using MediatR;

namespace ClassifyApi.Handlers.Items;

public class GetItemByIdHandler : IRequestHandler<GetItemByIdQuery, Item?>
{
    private readonly IItemData _itemData;

    public GetItemByIdHandler(IItemData itemData)
    {
        _itemData = itemData;
    }

    public async Task<Item?> Handle(GetItemByIdQuery request, CancellationToken cancellationToken)
    {
        Item? item = await _itemData.GetByIdAsync(request.Id);
        if (item is null || item.OrgId.Equals(request.OrgId) is false)
        {
            return null;
        }

        return item;
    }
}
