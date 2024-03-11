using ClassifyApi.Authentication;
using ClassifyApi.Authentication.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Activities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ClassifyApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
[EnableCors]
public class ActivitiesController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<ActivitiesController> _logger;
    private readonly IAuthService _authService;

    public ActivitiesController(
        IMediator mediator, 
        ILogger<ActivitiesController> logger,
        IAuthService authService)
    {
        _mediator = mediator;
        _logger = logger;
        _authService = authService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllActivitesAsync([FromQuery] int? amount)
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetAllActivitiesQuery query = new(user.OrgId, amount);
            List<ActivityLog> activities = await _mediator.Send(query);

            return Ok(activities);
        }
        catch (Exception ex)
        {
            _logger.LogError("[ACTIVITY_GET]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }
}
