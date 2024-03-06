using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Items;

public class UpdateItemCommand : IRequest<Item>
{
    public int Id { get; }
    public string OrgId { get; }
    public int? FolderId { get; }
    public string? Name { get; }
    public string? ImageUrl { get; }
    public int Quantity { get; }
    public int MinimumLevel { get; }
    public decimal Price { get; }

    public UpdateItemCommand(
        int id,
        string orgId,
        int? folderId,
        string? name,
        string? imageUrl,
        int quantity,
        int minimumLevel,
        decimal price)
    {
        Id = id;
        FolderId = folderId;
        Name = name;
        ImageUrl = imageUrl;
        Quantity = quantity;
        MinimumLevel = minimumLevel;
        Price = price;
        OrgId = orgId;
    }
}
