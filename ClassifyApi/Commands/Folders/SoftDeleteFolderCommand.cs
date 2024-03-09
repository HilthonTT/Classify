using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Folders;

public class SoftDeleteFolderCommand : IRequest<Folder?>
{
    public int Id { get; set; }
    public User User { get; set; }

    public SoftDeleteFolderCommand(int id, User user)
    {
        Id = id;
        User = user;
    }
}
