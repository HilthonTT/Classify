using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Items;

public class GetDeletedItemsByOrgIdQuery : IRequest<List<Item>>
{
    public string OrgId { get; set; }

    public GetDeletedItemsByOrgIdQuery(string orgId)
    {
        OrgId = orgId;
    }
}
