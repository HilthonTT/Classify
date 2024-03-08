using ClassifyApi.Library.Models;

namespace ClassifyApi.Library.DataAccess.Interfaces;
public interface IActivityLogData
{
    Task<ActivityLog> CreateActivityLogAsync(ActivityLog activityLog);
    Task<ActivityLog> DeleteActivityLogAsync(ActivityLog activityLog);
    Task<List<ActivityLog>> GetAllActivityLogsAsync(string orgId);
    Task<List<ActivityLog>> GetEntityActivityLogsAsync(EntityType entityType, string orgId, int entityId);
    Task<ActivityLog> UpdateActivityLogAsync(ActivityLog activityLog);
}