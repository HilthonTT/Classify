using ClassifyApi.Library.Contexts;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using Microsoft.EntityFrameworkCore;

namespace ClassifyApi.Library.DataAccess;
public class SummaryData : ISummaryData
{
    private readonly AppDbContext _db;

    public SummaryData(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Summary> GetSummaryAsync(string orgId)
    {
        List<Folder> folders = await _db.Folders.Where(f => f.OrgId == orgId).ToListAsync();
        List<Item> items = await _db.Items.Where(i => i.OrgId == orgId).ToListAsync();

        int totalQuantity = items.Sum(i => i.Quantity);
        decimal totalPrice = items.Sum(i => i.Price * i.Quantity);

        Summary summary = new()
        {
            FolderCount = folders.Count,
            ItemCount = items.Count,
            UnitCount = totalQuantity,
            TotalValue = totalPrice
        };

        return summary;
    }
}
