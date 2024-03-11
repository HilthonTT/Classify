using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Activities;
using MediatR;

namespace ClassifyApi.Handlers.Activities;

public class GetAllActivityHandler : IRequestHandler<GetAllActivitiesQuery, List<ActivityLog>>
{
    private readonly IActivityLogData _activityLogData;

    public GetAllActivityHandler(IActivityLogData activityLogData)
    {
        _activityLogData = activityLogData;
    }

    public async Task<List<ActivityLog>> Handle(GetAllActivitiesQuery request, CancellationToken cancellationToken)
    {
        List<ActivityLog> activities = await _activityLogData.GetAllActivityLogsAsync(request.OrgId);

        if (request.Amount is not null)
        {
            activities = activities.Take(request.Amount.Value).ToList();
        }

        return activities;
    }  
}
