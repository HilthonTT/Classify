namespace ClassifyApi.Authentication;

public class User
{
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string ImageUrl { get; set; }
    public string? OrgId { get; set; }
    public string? OrgRole { get; set; }

    public string FullName => $"{FirstName} {LastName}";
}
