using ClassifyApi.Enums;
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

        if (string.IsNullOrWhiteSpace(request.Search) is false)
        {
            items = items.Where(i => i.Name.Contains(
                request.Search, StringComparison.InvariantCultureIgnoreCase)).ToList();
        }

        switch (request.Sort)
        {
            case ItemSortType.Name:
                items = [.. items.OrderByDescending(i => i.Name)];
                break;
            case ItemSortType.CreatedAt:
                items = [.. items.OrderByDescending(i => i.DateCreated)];
                break;
            case ItemSortType.Quantity:
                items = [.. items.OrderByDescending(i => i.Quantity)];
                break;
            case ItemSortType.Price:
                items = [.. items.OrderByDescending(i => i.Price)];
                break;
            default:
                break;
        }

        return items;
    }
}
