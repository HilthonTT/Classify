using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Items;

public class MoveFolderCommand : IRequest<Item?>
{
    public int ItemId { get; set; }
    public int FolderId { get; set; }
    public string? Notes { get; set; }
    public User User { get; set; }

    public MoveFolderCommand(int itemId, int folderId, string? notes, User user)
    {
        ItemId = itemId;
        FolderId = folderId;
        Notes = notes;
        User = user;
    }
}
