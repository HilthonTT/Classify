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
            User? user = await _authService.GetUserFromAuthAsync(HttpContext);
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
            User? user = await _authService.GetUserFromAuthAsync(HttpContext);
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
            User? user = await _authService.GetUserFromAuthAsync(HttpContext);
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
    public async Task<IActionResult> CreateItemAsync([FromBody] CreateItemModel value)
    {
        try
        {
            User? user = await _authService.GetUserFromAuthAsync(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            CreateItemCommand command = new
            (
                value.Name,
                value.ImageUrl,
                value.Quantity,
                value.MinimumLevel,
                value.Price,
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
    public async Task<IActionResult> UpdateItemAsync([FromBody] UpdateItemModel value)
    {
        try
        {
            User? user = await _authService.GetUserFromAuthAsync(HttpContext);
            if (string.IsNullOrWhiteSpace(user?.OrgId))
            {
                return StatusCode(401, "Unauthorized");
            }

            UpdateItemCommand command = new(
                value.Id,
                value.FolderId,
                value.Name,
                value.ImageUrl,
                value.Quantity,
                value.MinimumLevel,
                value.Price,
                value.Deleted,
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

    [HttpDelete("soft/{itemId}")]
    public async Task<IActionResult> SoftDeleteItemAsync(int itemId)
    {
        try
        {
            User? user = await _authService.GetUserFromAuthAsync(HttpContext);
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
            User? user = await _authService.GetUserFromAuthAsync(HttpContext);
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
