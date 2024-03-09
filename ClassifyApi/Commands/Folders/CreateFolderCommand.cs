using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Folders;

public class CreateFolderCommand : IRequest<Folder>
{
    public string Name { get; set; }
    public string? Notes { get; set; }
    public int? TagId { get; set; }
    public User User { get; set; }

    public CreateFolderCommand(string name, string? notes, int? tagId, User user)
    {
        Name = name;
        Notes = notes;
        TagId = tagId;
        User = user;
    }
}
