using ClassifyApi.Library.Models;

namespace ClassifyApi.Library.DataAccess.Interfaces;
public interface IFolderData
{
    Task<Folder> CreateFolderAsync(Folder folder);
    Task<Folder> DeleteFolderAsync(Folder folder);
    Task<List<Folder>> GetAllFoldersAsync(string orgId);
    Task<List<Folder>> GetDeletedFoldersAsync(string orgId);
    Task<Folder?> GetFolderByIdAsync(int id);
    Task<Folder> UpdateFolderAsync(Folder folder);
}