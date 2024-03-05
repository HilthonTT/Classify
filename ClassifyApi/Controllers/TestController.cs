using ClassifyApi.Authentication;
using ClassifyApi.Authentication.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace ClassifyApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TestController : ControllerBase
{
    private readonly IAuthService _authService;

    public TestController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpGet]
    public IActionResult Test()
    {
        User? user = _authService.GetUserFromAuth(HttpContext);

        Console.WriteLine(JsonSerializer.Serialize(user));

        return Ok("Value");
    }
}
