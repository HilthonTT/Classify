using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Folders;

public class DeleteFolderCommand : IRequest<Folder?>
{
    public int Id { get; set; }
    public User User { get; set; }

    public DeleteFolderCommand(int id, User user)
    {
        Id = id;
        User = user;
    }
}
