using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Summaries;

public class GetSummaryQuery : IRequest<Summary>
{
    public string OrgId { get; set; }

    public GetSummaryQuery(string orgId)
    {
        OrgId = orgId;
    }
}
