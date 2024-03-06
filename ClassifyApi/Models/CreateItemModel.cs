using System.ComponentModel.DataAnnotations;

namespace ClassifyApi.Models;

public class CreateItemModel
{
    [Required(ErrorMessage = "Name is required")]
    [MinLength(1, ErrorMessage = "Name is too short")]
    [MaxLength(60, ErrorMessage = "Name is too long")]
    public required string Name { get; set; }


    public string? ImageUrl { get; set; }
    public int Quantity { get; set; }
    public int MinimumLevel { get; set; }
    public decimal Price { get; set; }
}
