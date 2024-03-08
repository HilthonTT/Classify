using System.Security.Claims;
using ClassifyApi.Authentication.Interfaces;
using Clerk.Net.Client;
using ClerkUser = Clerk.Net.Client.Models.User;

namespace ClassifyApi.Authentication;

public class AuthService : IAuthService
{
    private readonly ClerkApiClient _clerkClient;

    public AuthService(ClerkApiClient clerkClient)
    {
        _clerkClient = clerkClient;
    }

    public async Task<User?> GetUserFromAuthAsync(HttpContext context)
    {
        List<Claim> claims = context.User.Claims.ToList();

        string? userId = claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault()?.Value;
        if (string.IsNullOrWhiteSpace(userId))
        {
            return null;
        }

        string? orgId = claims.Where(c => c.Type == "org_id").FirstOrDefault()?.Value;
        string? orgRole = claims.Where(c => c.Type == "org_role").FirstOrDefault()?.Value;

        List<ClerkUser>? clerkUsers = await _clerkClient.Users.GetAsync();

        if (clerkUsers is null)
        {
            return null;
        }

        ClerkUser? clerkUser = clerkUsers.FirstOrDefault(u => u.Id == userId);
        if (clerkUser is null)
        {
            return null;
        }

        User user = new()
        {
            Id = userId,
            OrgId = orgId,
            OrgRole = orgRole,
            FirstName = clerkUser.FirstName!,
            LastName = clerkUser.LastName!,
            ImageUrl = clerkUser.ImageUrl!,
        };

        return user;
    }
}
