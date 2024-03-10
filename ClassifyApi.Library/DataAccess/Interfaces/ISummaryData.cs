using ClassifyApi.Library.Models;

namespace ClassifyApi.Library.DataAccess.Interfaces;
public interface ISummaryData
{
    Task<Summary> GetSummaryAsync(string orgId);
}