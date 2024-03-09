using ClassifyApi.Authentication;
using ClassifyApi.Authentication.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Tags;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ClassifyApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class TagsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<TagsController> _logger;
    private readonly IAuthService _authService;

    public TagsController(
        IMediator mediator,
        ILogger<TagsController> logger,
        IAuthService authService)
    {
        _mediator = mediator;
        _logger = logger;
        _authService = authService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTagsAsync()
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetTagsByOrgIdQuery query = new(user.OrgId);

            List<Tag> tags = await _mediator.Send(query);

            return Ok(tags);
        }
        catch (Exception ex)
        {
            _logger.LogError("[TAGS_GET]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }
}
