using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Items;

public class GetItemByIdQuery : IRequest<Item>
{
    public int Id { get; }
    public string? OrgId { get; set; }

    public GetItemByIdQuery(int id, string orgId)
    {
        Id = id;
        OrgId = orgId;
    }
}
