using System.ComponentModel.DataAnnotations;

namespace ClassifyApi.Models;

public class UpdateItemModel
{
    [Required(ErrorMessage = "Id is required")]
    public int Id { get; set; }
    public int? FolderId { get; set; }
    public string? Name { get; set; }
    public string? ImageUrl { get; set; }

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; }

    [Range(0, int.MaxValue)]
    public int MinimumLevel { get; set; }
    public decimal Price { get; set; }
    public string? Reason { get; set; }
}
