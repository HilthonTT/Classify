namespace ClassifyApi.Authentication.Interfaces;

public interface IAuthService
{
    Task<User?> GetUserFromAuthAsync(HttpContext context);
}