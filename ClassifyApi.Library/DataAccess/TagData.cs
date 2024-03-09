using ClassifyApi.Library.Contexts;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ClassifyApi.Library.DataAccess;
public class TagData : ITagData
{
    private readonly AppDbContext _db;

    public TagData(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Tag>> GetAllTagsAsync(string orgId)
    {
        List<Tag> tags = await _db.Tags
            .Where(t => t.OrgId == orgId)
            .ToListAsync();

        return tags;
    }

    public async Task<Tag?> GetTagAsync(int id)
    {
        Tag? tag = await _db.Tags
            .Where(t => t.Id == id)
            .FirstOrDefaultAsync();

        return tag;
    }

    public async Task<Tag> CreateTagAsync(Tag tag)
    {
        EntityEntry<Tag> result = await _db.Tags.AddAsync(tag);

        await _db.SaveChangesAsync();

        return result.Entity;
    }
    public async Task<Tag> UpdateTagAsync(Tag tag)
    {
        EntityEntry<Tag> result = _db.Tags.Update(tag);

        await _db.SaveChangesAsync();

        return result.Entity;
    }

    public async Task<Tag> DeleteTagAsync(Tag tag)
    {
        EntityEntry<Tag> result = _db.Tags.Remove(tag);

        await _db.SaveChangesAsync();

        return result.Entity;
    }
}
