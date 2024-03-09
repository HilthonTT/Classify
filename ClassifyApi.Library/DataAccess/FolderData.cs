using ClassifyApi.Library.Contexts;
using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ClassifyApi.Library.DataAccess;
public class FolderData : IFolderData
{
    private readonly AppDbContext _db;

    public FolderData(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Folder>> GetAllFoldersAsync(string orgId)
    {
        List<Folder> folders = await _db.Folders
            .Where(f => f.OrgId == orgId)
            .Include(f => f.Items)
            .ToListAsync();

        return folders;
    }

    public async Task<List<Folder>> GetDeletedFoldersAsync(string orgId)
    {
        List<Folder> folders = await _db.Folders
            .Where(f => f.OrgId == orgId && f.Deleted)
            .Include(f => f.Items)
            .ToListAsync();

        return folders;
    }

    public async Task<Folder?> GetFolderByIdAsync(int id)
    {
        Folder? folder = await _db.Folders
            .Where(f => f.Id == id)
            .Include(f => f.Items)
            .FirstOrDefaultAsync();

        return folder;
    }

    public async Task<Folder> CreateFolderAsync(Folder folder)
    {
        EntityEntry<Folder> result = await _db.Folders.AddAsync(folder);

        await _db.SaveChangesAsync();

        return result.Entity;
    }

    public async Task<Folder> UpdateFolderAsync(Folder folder)
    {
        EntityEntry<Folder> result = _db.Folders.Update(folder);

        await _db.SaveChangesAsync();

        return result.Entity;
    }

    public async Task<Folder> DeleteFolderAsync(Folder folder)
    {
        EntityEntry<Folder> result = _db.Folders.Remove(folder);

        await _db.SaveChangesAsync();

        return result.Entity;
    }
}
