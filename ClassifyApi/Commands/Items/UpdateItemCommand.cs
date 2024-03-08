using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Items;

public class UpdateItemCommand : IRequest<Item>
{
    public int Id { get; }
    public int? FolderId { get; }
    public string? Name { get; }
    public string? ImageUrl { get; }
    public int Quantity { get; }
    public int MinimumLevel { get; }
    public decimal Price { get; }
    public bool? Deleted { get; set; }
    public User User { get; set; }

    public UpdateItemCommand(
        int id,
        int? folderId,
        string? name,
        string? imageUrl,
        int quantity,
        int minimumLevel,
        decimal price,
        bool? deleted,
        User user)
    {
        Id = id;
        FolderId = folderId;
        Name = name;
        ImageUrl = imageUrl;
        Quantity = quantity;
        MinimumLevel = minimumLevel;
        Price = price;
        User = user;
        Deleted = deleted;
    }
}
