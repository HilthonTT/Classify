using ClassifyApi.Authentication;
using ClassifyApi.Authentication.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Folders;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ClassifyApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class FolderController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IAuthService _authService;
    private readonly ILogger<FolderController> _logger;

    public FolderController(
        IMediator mediator,
        IAuthService authService,
        ILogger<FolderController> logger)
    {
        _mediator = mediator;
        _authService = authService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllFoldersAsync()
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetAllFoldersByOrgIdQuery query = new(user.OrgId);

            List<Folder> folders = await _mediator.Send(query);

            return Ok(folders);
        }
        catch (Exception ex)
        {
            _logger.LogError("[FOLDERS_GET]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }
}
