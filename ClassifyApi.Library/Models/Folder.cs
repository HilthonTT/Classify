using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ClassifyApi.Library.Models;

[Index(nameof(OrgId))]
public class Folder
{
    public int Id { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(50)]
    public required string OrgId { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(60)]
    public required string Name { get; set; }

    [MaxLength(4000)]
    public string? Notes { get; set; }

    public List<Item> Items { get; set; } = [];

    [Required]
    public bool Deleted { get; set; } = false;

    [Required]
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
}
