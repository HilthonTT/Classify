using ClassifyApi.Authentication;
using ClassifyApi.Authentication.Interfaces;
using ClassifyApi.Commands.Items;
using ClassifyApi.Enums;
using ClassifyApi.Library.Models;
using ClassifyApi.Models;
using ClassifyApi.Queries.Items;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ClassifyApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
[EnableCors]
public class ItemsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IAuthService _authService;
    private readonly ILogger<ItemsController> _logger;

    public ItemsController(
        IMediator mediator,
        IAuthService authService,
        ILogger<ItemsController> logger)
    {
        _mediator = mediator;
        _authService = authService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetItemsAsync(
        [FromQuery] string? search, 
        [FromQuery] ItemSortType? sort)
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetItemsByOrgIdQuery query = new(user.OrgId, search, sort);
            List<Item> items = await _mediator.Send(query);

            return Ok(items);
        }
        catch (Exception ex)
        {
            _logger.LogError("[ITEMS_GET]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpGet("deleted")]
    public async Task<IActionResult> GetDeleteItemsAsync()
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetDeletedItemsByOrgIdQuery query = new(user.OrgId);

            List<Item> deletedItems = await _mediator.Send(query);

            return Ok(deletedItems);
        }
        catch (Exception ex)
        {
            _logger.LogError("[ITEMS_GET_DELETED]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpGet("{itemId}")]
    public async Task<IActionResult> GetItemByIdAsync(int itemId)
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            GetItemByIdQuery query = new(itemId, user.OrgId);
            Item item = await _mediator.Send(query);

            return Ok(item);
        }
        catch (Exception ex)
        {
            _logger.LogError("[ITEMS_GET_ID]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateItemAsync([FromBody] CreateItemModel values)
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

            CreateItemCommand command = new
            (
                values.Name,
                values.ImageUrl,
                values.Quantity,
                values.MinimumLevel,
                values.Price,
                user);

            Item item = await _mediator.Send(command);

            return Ok(item);
        }
        catch (Exception ex)
        {
            _logger.LogError("[ITEMS_POST]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateItemAsync([FromBody] UpdateItemModel values)
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

            UpdateItemCommand command = new(
                values.Id,
                values.FolderId,
                values.Name,
                values.ImageUrl,
                values.Quantity,
                values.MinimumLevel,
                values.Price,
                values.Deleted,
                user);

            Item? item = await _mediator.Send(command);

            return Ok(item);
        }
        catch (Exception ex)
        {
            _logger.LogError("[ITEMS_PATCH]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpPatch("moveFolder")]
    public async Task<IActionResult> MoveFolderAsync([FromBody] MoveFolderModel values)
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

            MoveFolderCommand command = new(values.ItemId, values.FolderId, values.Notes, user);
            Item? item = await _mediator.Send(command);

            return Ok(item);
        }
        catch (Exception ex)
        {
            _logger.LogError("[ITEMS_PATCH_MOVE_FOLDER]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpDelete("soft/{itemId}")]
    public async Task<IActionResult> SoftDeleteItemAsync(int itemId)
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            SoftDeleteItemCommand command = new(itemId, user);

            Item? item = await _mediator.Send(command);

            return Ok(item);
        }
        catch (Exception ex)
        {
            _logger.LogError("[ITEMS_SOFT_DELETE]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }

    [HttpDelete("{itemId}")]
    public async Task<IActionResult> DeleteItemAsync(int itemId)
    {
        try
        {
            User? user = _authService.GetUserFromAuth(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            DeleteItemCommand command = new(itemId, user);

            Item? item = await _mediator.Send(command);

            return Ok(item);
        }
        catch (Exception ex)
        {
            _logger.LogError("[ITEMS_DELETE]: {message}", ex.Message);
            return StatusCode(500, "Internal Error");
        }
    }
}
