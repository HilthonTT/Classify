using ClassifyApi.Authentication;
using ClassifyApi.Authentication.Interfaces;
using ClassifyApi.Commands.Folders;
using ClassifyApi.Library.Models;
using ClassifyApi.Models;
using ClassifyApi.Queries.Folders;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ClassifyApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class FoldersController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IAuthService _authService;
    private readonly ILogger<FoldersController> _logger;

    public FoldersController(
        IMediator mediator,
        IAuthService authService,
        ILogger<FoldersController> logger)
    {
        _mediator = mediator;
        _authService = authService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllFoldersAsync([FromQuery] string? search)
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetFoldersByOrgIdQuery query = new(user.OrgId, search);

            List<Folder> folders = await _mediator.Send(query);

            return Ok(folders);
        }
        catch (Exception ex)
        {
            _logger.LogError("[FOLDERS_GET]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpGet("deleted")]
    public async Task<IActionResult> GetDeletedFoldersAsync()
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetDeletedFoldersByOrgIdQuery query = new(user.OrgId);

            List<Folder> folders = await _mediator.Send(query);

            return Ok(folders);
        }
        catch (Exception ex)
        {
            _logger.LogError("[FOLDERS_GET_DELETED]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpGet("{folderId}")]
    public async Task<IActionResult> GetFolderAsync(int folderId)
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetFolderByIdQuery query = new(folderId, user);

            Folder? folder = await _mediator.Send(query);

            return Ok(folder);
        }
        catch (Exception ex)
        {
            _logger.LogError("[FOLDERS_GET_ID]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateFolderAsync([FromBody] CreateFolderModel values)
    {
        if (ModelState.IsValid is false)
        {
            return BadRequest(ModelState);
        }

        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            CreateFolderCommand command = new(values.Name, values.Notes, values.TagId, user);

            Folder folder = await _mediator.Send(command);

            return Ok(folder);
        }
        catch (Exception ex)
        {
            _logger.LogError("[FOLDERS_POST]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateFolderAsync([FromBody] UpdateFolderModel values)
    {
        if (ModelState.IsValid is false)
        {
            return BadRequest(ModelState);
        }

        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            UpdateFolderCommand command = new(values.Id, values.Name, values.Notes, values.Deleted, user, values.TagId);

            Folder folder = await _mediator.Send(command);

            return Ok(folder);
        }
        catch (Exception ex)
        {
            _logger.LogError("[FOLDERS_PATCH]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpDelete("soft/{folderId}")]
    public async Task<IActionResult> SoftDeleteFolderAsync(int folderId)
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }
            
            SoftDeleteFolderCommand command = new(folderId, user);

            Folder? folder = await _mediator.Send(command);
            
            return Ok(folder);
        }
        catch (Exception ex)
        {
            _logger.LogError("[FOLDERS_SOFT_DELETE]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpDelete("{folderId}")]
    public async Task<IActionResult> DeleteFolderAsync(int folderId)
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            DeleteFolderCommand command = new(folderId, user);

            Folder? folder = await _mediator.Send(command);

            return Ok(folder);
        }
        catch (Exception ex)
        {
            _logger.LogError("[FOLDERS_DELETE]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }
}
