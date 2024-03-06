using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Items;

public class SoftDeleteItemCommand : IRequest<Item>
{
    public int Id { get; }
    public string OrgId { get; }

    public SoftDeleteItemCommand(int id, string orgId)
    {
        Id = id;
        OrgId = orgId;
    }
}
