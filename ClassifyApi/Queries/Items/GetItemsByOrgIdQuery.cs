using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Items;

public class GetItemsByOrgIdQuery : IRequest<List<Item>>
{
    public string OrgId { get; }

    public GetItemsByOrgIdQuery(string orgId)
    {
        OrgId = orgId;
    }
}
