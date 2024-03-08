using ClassifyApi.Authentication;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Commands.Items;

public class CreateItemCommand : IRequest<Item>
{
    public string Name { get; }
    public string? ImageUrl { get; }
    public int Quantity { get; }
    public int MinimumLevel { get; }
    public decimal Price { get; }
    public User User { get; set; }

    public CreateItemCommand(string name, string? imageUrl, int quantity, int minimumLevel, decimal price, User user)
    {
        Name = name;
        User = user;
        ImageUrl = imageUrl;
        Quantity = quantity;
        MinimumLevel = minimumLevel;
        Price = price;
    }
}