using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Folders;

public class GetFolderByIdQuery : IRequest<Folder?>
{
    public int Id { get; set; }
    public User User { get; set; }

    public GetFolderByIdQuery(int id, User user)
    {
        Id = id;
        User = user;
    }
}
