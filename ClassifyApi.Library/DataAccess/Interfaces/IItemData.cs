using ClassifyApi.Library.Models;

namespace ClassifyApi.Library.DataAccess.Interfaces;
public interface IItemData
{
    Task<Item> CreateAsync(Item item);
    Task<Item> DeleteAsync(Item item);
    Task<Item?> GetByIdAsync(int id);
    Task<List<Item>> GetByOrgIdAsync(string orgId, bool withFolder = false);
    Task<List<Item>> GetOrgDeletedItemsAsync(string orgId);
    Task<Item> UpdateAsync(Item item);
}