using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Items;

public class DeleteItemCommand : IRequest<Item>
{
    public int Id { get; }
    public User User { get; set; }

    public DeleteItemCommand(int id, User user)
    {
        Id = id;
        User = user;
    }
}
