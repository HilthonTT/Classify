using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Activities;

public class GetAllActivitiesQuery : IRequest<List<ActivityLog>>
{
    public string OrgId { get; set; }
    public int? Amount { get; set; }

    public GetAllActivitiesQuery(string orgId, int? amount)
    {
        OrgId = orgId;
        Amount = amount;
    }
}
