using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ClassifyApi.Library.Models;

[Index(nameof(OrgId))]
public class Tag
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string OrgId { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(50)]
    public required string Name { get; set; }

    [Required]
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
}
