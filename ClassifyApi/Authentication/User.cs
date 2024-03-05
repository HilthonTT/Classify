namespace ClassifyApi.Authentication;

public class User
{
    public required string Id { get; set; }
    public string? OrgId { get; set; }
    public string? OrgRole { get; set; }
}
