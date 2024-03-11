using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Items;
using MediatR;

namespace ClassifyApi.Handlers.Items;

public class GetRecentItemsHandler : IRequestHandler<GetRecentItemsQuery, List<Item>>
{
    private readonly IItemData _itemData;

    public GetRecentItemsHandler(IItemData itemData)
    {
        _itemData = itemData;
    }

    public async Task<List<Item>> Handle(GetRecentItemsQuery request, CancellationToken cancellationToken)
    {
        List<Item> items = await _itemData.GetByOrgIdAsync(request.OrgId, true);

        if (request.Amount is not null)
        {
            items = items
                .OrderByDescending(i => i.DateCreated)
                .Take(request.Amount.Value)
                .ToList();
        }

        return items;
    }
}
