using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Items;
using MediatR;

namespace ClassifyApi.Handlers.Items;

public class GetItemsByOrgIdHandler : IRequestHandler<GetItemsByOrgIdQuery, List<Item>>
{
    private readonly IItemData _itemData;

    public GetItemsByOrgIdHandler(IItemData itemData)
    {
        _itemData = itemData;
    }

    public async Task<List<Item>> Handle(GetItemsByOrgIdQuery request, CancellationToken cancellationToken)
    {
        List<Item> items = await _itemData.GetByOrgIdAsync(request.OrgId);

        return items;
    }
}
