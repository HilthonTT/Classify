using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Folders;

public class UpdateFolderCommand : IRequest<Folder>
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Notes { get; set; }
    public bool? Deleted { get; set; }
    public User User { get; set; }

    public UpdateFolderCommand(int id, string? name, string? notes, bool? deleted, User user)
    {
        Id = id;
        Name = name;
        Notes = notes;
        Deleted = deleted;
        User = user;
    }
}
