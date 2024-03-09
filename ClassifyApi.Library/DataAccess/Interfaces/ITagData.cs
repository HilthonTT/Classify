using ClassifyApi.Library.Models;

namespace ClassifyApi.Library.DataAccess.Interfaces;
public interface ITagData
{
    Task<Tag> CreateTagAsync(Tag tag);
    Task<Tag> DeleteTagAsync(Tag tag);
    Task<List<Tag>> GetAllTagsAsync(string orgId);
    Task<Tag?> GetTagAsync(int id);
    Task<Tag> UpdateTagAsync(Tag tag);
}