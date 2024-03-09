using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Tags;

public class GetTagsByOrgIdQuery : IRequest<List<Tag>>
{
    public string OrgId { get; set; }

    public GetTagsByOrgIdQuery(string orgId)
    {
        OrgId = orgId;
    }
}
