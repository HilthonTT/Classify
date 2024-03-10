using System.ComponentModel.DataAnnotations;

namespace ClassifyApi.Models;

public class MoveFolderModel
{

    [Required(ErrorMessage = "Item Id is required")]
    public int ItemId { get; set; }

    [Required(ErrorMessage = "Folder Id is required")]
    public int FolderId { get; set; }

    [MaxLength(4000, ErrorMessage = "Notes are too long")]
    public string? Notes { get; set; }
}
