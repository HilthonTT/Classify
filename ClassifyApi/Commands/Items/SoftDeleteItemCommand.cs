using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Items;

public class SoftDeleteItemCommand : IRequest<Item>
{
    public int Id { get; }
    public User User { get; set; }

    public SoftDeleteItemCommand(int id, User user)
    {
        Id = id;
        User = user;
    }
}
