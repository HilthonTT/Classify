using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Items;

public class DeleteItemCommand : IRequest<Item>
{
    public int Id { get; }
    public string OrgId { get; }

    public DeleteItemCommand(int id, string orgId)
    {
        Id = id;
        OrgId = orgId;
    }
}
