using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Items;
using MediatR;

namespace ClassifyApi.Handlers.Items;

public class GetDeletedItemsHandler : IRequestHandler<GetDeletedItemsByOrgIdQuery, List<Item>>
{
    private readonly IItemData _itemData;

    public GetDeletedItemsHandler(IItemData itemData)
    {
        _itemData = itemData;
    }

    public async Task<List<Item>> Handle(GetDeletedItemsByOrgIdQuery request, CancellationToken cancellationToken)
    {
        List<Item> deletedItems = await _itemData.GetOrgDeletedItemsAsync(request.OrgId);

        return deletedItems;
    }
}
