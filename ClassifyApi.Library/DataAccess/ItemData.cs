using ClassifyApi.Library.Contexts;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ClassifyApi.Library.DataAccess;
public class ItemData : IItemData
{
    private readonly AppDbContext _db;

    public ItemData(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Item>> GetByOrgIdAsync(string orgId)
    {
        List<Item> items = await _db.Items
            .Where(i => i.OrgId == orgId && i.Deleted == false)
            .ToListAsync();

        return items;
    }

    public async Task<List<Item>> GetOrgDeletedItemsAsync(string orgId)
    {
        List<Item> items = await _db.Items.Where(i => i.OrgId == orgId && i.Deleted).ToListAsync();

        return items;
    }

    public async Task<Item?> GetByIdAsync(int id)
    {
        Item? item = await _db.Items.FirstOrDefaultAsync(i => i.Id == id);

        return item;
    }

    public async Task<Item> CreateAsync(Item item)
    {
        EntityEntry<Item> result = await _db.Items.AddAsync(item);

        await _db.SaveChangesAsync();

        return result.Entity;
    }

    public async Task<Item> UpdateAsync(Item item)
    {
        await _db.SaveChangesAsync();

        return item;
    }

    public async Task<Item> DeleteAsync(Item item)
    {
        EntityEntry<Item> result = _db.Items.Remove(item);

        await _db.SaveChangesAsync();

        return result.Entity;
    }
}
