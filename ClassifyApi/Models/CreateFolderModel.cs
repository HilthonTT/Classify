using System.ComponentModel.DataAnnotations;

namespace ClassifyApi.Models;

public class CreateFolderModel
{
    [Required(ErrorMessage = "Org Id is required")]
    [MinLength(1, ErrorMessage = "Org Id is too short")]
    [MaxLength(50, ErrorMessage = "Org Id is too long")]
    public required string OrgId { get; set; }

    [Required(ErrorMessage = "Name is required")]
    [MinLength(1, ErrorMessage = "Name is too short")]
    [MaxLength(60, ErrorMessage = "Name is too long")]
    public required string Name { get; set; }

    [MaxLength(4000, ErrorMessage = "Notes are too long")]
    public string? Notes { get; set; }
    public int? TagId { get; set; }
}
