using ClassifyApi.Library.Contexts;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ClassifyApi.Library.DataAccess;
public class ActivityLogData : IActivityLogData
{
    private readonly AppDbContext _db;

    public ActivityLogData(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<ActivityLog>> GetAllActivityLogsAsync(string orgId)
    {
        List<ActivityLog> activities = await _db.ActivityLogs
            .Where(a => a.OrgId == orgId)
            .ToListAsync();

        return activities;
    }

    public async Task<List<ActivityLog>> GetEntityActivityLogsAsync(EntityType entityType, string orgId, int entityId)
    {
        List<ActivityLog> activities = await _db.ActivityLogs
            .Where(
                a => a.OrgId == orgId &&
                a.EntityType == entityType &&
                a.EntityId == entityId)
            .ToListAsync();

        return activities;
    }

    public async Task<ActivityLog> CreateActivityLogAsync(ActivityLog activityLog)
    {
        try
        {
            EntityEntry<ActivityLog> result = await _db.ActivityLogs.AddAsync(activityLog);

            await _db.SaveChangesAsync();

            return result.Entity;
        }
        catch (Exception ex)
        {
            string message = ex.Message;
            throw;
        }
    }

    public async Task<ActivityLog> UpdateActivityLogAsync(ActivityLog activityLog)
    {
        await _db.SaveChangesAsync();

        return activityLog;
    }

    public async Task<ActivityLog> DeleteActivityLogAsync(ActivityLog activityLog)
    {
        EntityEntry<ActivityLog> result = _db.ActivityLogs.Remove(activityLog);

        await _db.SaveChangesAsync();

        return result.Entity;
    }
}
