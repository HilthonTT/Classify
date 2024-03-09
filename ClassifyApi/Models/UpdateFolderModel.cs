using System.ComponentModel.DataAnnotations;

namespace ClassifyApi.Models;

public class UpdateFolderModel
{
    [Required(ErrorMessage = "Id is required")]
    public int Id { get; set; }

    [MinLength(1, ErrorMessage = "Name is too short")]
    [MaxLength(60, ErrorMessage = "Name is too long")]
    public string? Name { get; set; }

    [MaxLength(4000, ErrorMessage = "Notes are too long")]
    public string? Notes { get; set; } 
    public bool? Deleted { get; set; }
}
