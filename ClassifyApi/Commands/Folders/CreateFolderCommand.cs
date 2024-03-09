using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Folders;

public class CreateFolderCommand : IRequest<Folder>
{
    public string Name { get; set; }
    public string? Notes { get; set; }
    public User User { get; set; }

    public CreateFolderCommand(string name, string? notes, User user)
    {
        Name = name;
        Notes = notes;
        User = user;
    }
}
