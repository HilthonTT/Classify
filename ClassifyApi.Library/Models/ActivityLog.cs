using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ClassifyApi.Library.Models;

[Index(nameof(OrgId))]
[Index(nameof(EntityId))]
[Index(nameof(EntityType))]
public class ActivityLog
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string OrgId { get; set; }

    [Required]
    public int EntityId { get; set; }

    [Required]
    public EntityType EntityType { get; set; }

    [Required]
    public Action Action { get; set; }

    [Required]
    [MaxLength(500)]
    public required string Username { get; set; }

    [Required]
    [MaxLength(50)]
    public required string UserId { get; set; }

    [Required]
    public required string UserImage { get; set; }

    [Required]
    [MaxLength(1000)]
    public required string Message { get; set; }

    [MaxLength(500)]
    public string? Reason { get; set; }

    [Required]
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
}

public enum EntityType
{
    Item,
    Folder,
}

public enum Action
{
    Create,
    Update,
    Delete,
    Trash,
}