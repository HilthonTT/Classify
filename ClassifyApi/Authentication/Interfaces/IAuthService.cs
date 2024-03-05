namespace ClassifyApi.Authentication.Interfaces;

public interface IAuthService
{
    User? GetUserFromAuth(HttpContext context);
}