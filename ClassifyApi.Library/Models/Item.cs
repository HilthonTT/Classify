using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassifyApi.Library.Models;

[Index(nameof(OrgId))]
public class Item
{
    public int Id { get; set; }

    [ForeignKey("Folder")]
    public int? FolderId { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(30)]
    public required string OrgId { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(60)]
    public required string Name { get; set; }

    [Url]
    public string? ImageUrl { get; set; }

    public int Quantity { get; set; }
    public int MinimumLevel { get; set; }
    public decimal Price { get; set; }

    [Required]
    public bool Deleted { get; set; } = false;
}
