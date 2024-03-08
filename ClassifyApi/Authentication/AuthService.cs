using System.Security.Claims;
using ClassifyApi.Authentication.Interfaces;

namespace ClassifyApi.Authentication;

public class AuthService : IAuthService
{
    public User? GetUserFromAuth(HttpContext context)
    {
        List<Claim> claims = context.User.Claims.ToList();

        string? userId = claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault()?.Value;
        if (string.IsNullOrWhiteSpace(userId))
        {
            return null;
        }

        string? orgId = claims.Where(c => c.Type.Contains("orgId")).FirstOrDefault()?.Value;
        string? orgRole = claims.Where(c => c.Type.Contains("orgRole")).FirstOrDefault()?.Value;

        string? firstName = claims.Where(c => c.Type.Contains("firstName")).FirstOrDefault()?.Value;
        string? lastName = claims.Where(c => c.Type.Contains("lastName")).FirstOrDefault()?.Value;
        string? imageUrl = claims.Where(c => c.Type.Contains("picture"))?.FirstOrDefault()?.Value;

        User user = new()
        {
            Id = userId,
            OrgId = orgId,
            OrgRole = orgRole,
            FirstName = firstName!,
            LastName = lastName!,
            ImageUrl = imageUrl!
        };

        return user;
    }
}
