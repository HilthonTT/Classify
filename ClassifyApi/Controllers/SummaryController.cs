using ClassifyApi.Authentication;
using ClassifyApi.Authentication.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Summaries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace ClassifyApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
[EnableCors]
public class SummaryController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<SummaryController> _logger;
    private readonly IAuthService _authService;

    public SummaryController(
        IMediator mediator,
        ILogger<SummaryController> logger,
        IAuthService authService)
    {
        _mediator = mediator;
        _logger = logger;
        _authService = authService;
    }

    [HttpGet]
    [OutputCache(PolicyName = "Summary")]
    public async Task<IActionResult> GetSummaryAsync()
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetSummaryQuery query = new(user.OrgId);
            Summary summary = await _mediator.Send(query);

            return Ok(summary);
        }
        catch (Exception ex)
        {
            _logger.LogError("[SUMMARY_GET]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }
}
