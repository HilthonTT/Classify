using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Items;

public class GetRecentItemsQuery : IRequest<List<Item>>
{
    public string OrgId { get; set; }
    public int? Amount { get; set; }

    public GetRecentItemsQuery(string orgId, int? amount)
    {
        OrgId = orgId;
        Amount = amount;
    }
}
