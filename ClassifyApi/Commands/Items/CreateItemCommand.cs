using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Items;

public class CreateItemCommand : IRequest<Item>
{
    public string Name { get; }
    public string OrgId { get; }
    public string? ImageUrl { get; }
    public int Quantity { get; }
    public int MinimumLevel { get; }
    public decimal Price { get; }

    public CreateItemCommand(string name, string orgId, string? imageUrl, int quantity, int minimumLevel, decimal price)
    {
        Name = name;
        OrgId = orgId;
        ImageUrl = imageUrl;
        Quantity = quantity;
        MinimumLevel = minimumLevel;
        Price = price;
    }
}