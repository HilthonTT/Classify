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

        string? orgId = claims.Where(c => c.Type == "org_id").FirstOrDefault()?.Value;
        string? orgRole = claims.Where(c => c.Type == "org_role").FirstOrDefault()?.Value;

        User user = new()
        {
            Id = userId,
            OrgId = orgId,
            OrgRole = orgRole,
        };

        return user;
    }
}
