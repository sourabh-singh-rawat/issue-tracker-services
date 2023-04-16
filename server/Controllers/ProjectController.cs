using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Utils;
using System.Net;
using AutoMapper;
using Services;
using Dtos.Project;
using System.Text.Json;
using System.Security.Claims;

[Authorize]
[ApiController]
[Route("api/projects")]
[Produces("application/json")]
public class ProjectController : ControllerBase
{
  private readonly IHttpContextAccessor _httpContextAccessor;
  private readonly IProjectService _projectService;

  public ProjectController(IHttpContextAccessor httpContextAccessor, IProjectService projectService)
  {
    _httpContextAccessor = httpContextAccessor;
    _projectService = projectService;
  }

  [HttpPost]
  public async Task<ActionResult<ApiResponse<ProjectPostDto>>> Create()
  {
    if (_httpContextAccessor != null && _httpContextAccessor.HttpContext != null)
    {
      var user = _httpContextAccessor.HttpContext.User;
      var request = _httpContextAccessor.HttpContext.Request;
      var response = new ApiResponse<Guid>();
      var options = new JsonSerializerOptions()
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true
      };

      try
      {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        var body = await JsonSerializer.DeserializeAsync<ProjectPostDto>(request.Body, options);

        if (userId != null && body != null)
        {
          var projectPostDto = new ProjectPostDto()
          {
            Name = body.Name,
            Description = body.Description,
            Status = body.Status,
            StartDate = body.StartDate,
            EndDate = body.EndDate,
          };
          var serviceResponse = await _projectService.Create(userId, projectPostDto);

          if (serviceResponse.Success && serviceResponse.Data != null)
          {
            response.Data = serviceResponse.Data;
            response.StatusCode = Convert.ToInt16(HttpStatusCode.Created);
            return Ok(response);
          }

          return Problem(response.ErrorMessage);
        }
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }
    }

    return Problem();
  }

  [HttpGet]
  public async Task<ActionResult<ListApiResponse<List<ProjectGetDto>>>> GetAll()
  {
    if (_httpContextAccessor != null && _httpContextAccessor.HttpContext != null)
    {
      var user = _httpContextAccessor.HttpContext.User;
      var request = _httpContextAccessor.HttpContext.Request;
      var response = new ListApiResponse<List<ProjectGetDto>>();

      try
      {
        var query = request.Query.Keys;
        var status = request.Query["status"];
        var sortBy = request.Query["sortBy"];
        var page = request.Query["page"];
        var limit = request.Query["limit"];

        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId != null)
        {
          var serviceResponse = await _projectService.GetAll(userId);
          if (serviceResponse.Success && serviceResponse.Data != null)
          {
            response.Rows = serviceResponse.Data;
            response.RowCount = serviceResponse.Data.Count();
            response.StatusCode = Convert.ToInt32(HttpStatusCode.OK);

            return Ok(response);
          }
        }

        response.ErrorMessage = "User not found";
        response.StatusCode = Convert.ToInt32(HttpStatusCode.NotFound);

        return NotFound(response);
      }
      catch (Exception ex)
      {
        response.ErrorMessage = ex.ToString();

        return response;
      }
    }

    return BadRequest();
  }

  [HttpGet]
  [Route("{id}")]
  public async Task<ActionResult<ApiResponse<ProjectGetDto>>> GetById([FromRoute] Guid id)
  {
    if (_httpContextAccessor != null && _httpContextAccessor.HttpContext != null)
    {
      var user = _httpContextAccessor.HttpContext.User;
      var request = _httpContextAccessor.HttpContext.Request;
      var response = new ApiResponse<ProjectGetDto>();

      try
      {
        var serviceResponse = await _projectService.GetById(id, user.FindFirstValue(ClaimTypes.NameIdentifier));

        if (serviceResponse.Success)
        {
          response.Data = serviceResponse.Data;
          response.StatusCode = Convert.ToInt16(HttpStatusCode.OK);
          return Ok(response);
        }

        response.StatusCode = Convert.ToInt16(HttpStatusCode.NotFound);
        return NotFound(response);
      }
      catch (Exception ex)
      {
        response.StatusCode = Convert.ToInt16(HttpStatusCode.InternalServerError);
        response.ErrorMessage = ex.ToString();
        return Problem(response.ErrorMessage);
      }
    }

    return BadRequest();
  }

  [HttpGet]
  [Route("{id}/members")]
  public async Task<ActionResult<ListApiResponse<ProjectMembersGetDto>>> GetProjectMembers(Guid id)
  {
    if (_httpContextAccessor != null && _httpContextAccessor.HttpContext != null)
    {
      var user = _httpContextAccessor.HttpContext.User;
      var request = _httpContextAccessor.HttpContext.Request;
      var response = new ListApiResponse<List<ProjectMembersGetDto>>();

      try
      {
        var serviceResponse = await _projectService.GetAllMembers(id, user.FindFirstValue(ClaimTypes.NameIdentifier));

        response.Rows = serviceResponse.Data;
        response.RowCount = serviceResponse.Data.Count();
        return Ok(response);
      }
      catch (Exception ex)
      {
        return BadRequest(id);
      }
    }

    return BadRequest();
  }

  [HttpGet]
  [Route("{id}/issuesStatusCount")]
  public async Task<ActionResult<ListApiResponse<List<ProjectIssuesStatusCountGetDto>>>> GetProjectIssuesStatusCount([FromRoute] Guid id)
  {
    if (_httpContextAccessor != null && _httpContextAccessor.HttpContext != null)
    {
      var user = _httpContextAccessor.HttpContext.User;
      var request = _httpContextAccessor.HttpContext.Request;
      var response = new ListApiResponse<List<ProjectIssuesStatusCountGetDto>>();

      try
      {
        var serviceResponse = await _projectService.GetAllIssuesStatusCount(id, user.FindFirstValue(ClaimTypes.NameIdentifier));
        if (serviceResponse.Success && serviceResponse.Data != null)
        {
          response.Rows = serviceResponse.Data;
          response.RowCount = serviceResponse.Data.Count();
          return Ok(response);
        }

        return BadRequest();
      }
      catch (Exception ex)
      {
        return BadRequest(ex.ToString());
      }
    }

    return BadRequest();
  }
}