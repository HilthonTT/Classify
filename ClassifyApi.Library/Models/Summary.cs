namespace ClassifyApi.Library.Models;
public class Summary
{
    public required int FolderCount { get; set; }
    public required int ItemCount { get; set; }
    public required int UnitCount { get; set; }
    public required decimal TotalValue { get; set; }
}
