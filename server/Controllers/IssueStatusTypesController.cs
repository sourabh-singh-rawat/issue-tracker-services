using System.Net;
using Dtos.Issues;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Utils;

[Authorize]
[ApiController]
[Route("api/issues/status")]
[Produces("application/json")]
public class IssueStatusTypesController : ControllerBase
{
  private readonly IHttpContextAccessor _httpContextAccessor;
  private readonly IIssueStatusTypesService _issueStatusTypesService;

  public IssueStatusTypesController(IHttpContextAccessor httpContextAccessor, IIssueStatusTypesService issueStatusTypesService)
  {
    _httpContextAccessor = httpContextAccessor;
    _issueStatusTypesService = issueStatusTypesService;
  }

  [HttpGet]
  public async Task<ActionResult<ListApiResponse<List<GetIssueStatusTypeDto>>>> GetAll()
  {
    if (_httpContextAccessor != null && _httpContextAccessor.HttpContext != null)
    {
      var user = _httpContextAccessor.HttpContext.User;
      var request = _httpContextAccessor.HttpContext.Request;
      var response = new ListApiResponse<List<GetIssueStatusTypeDto>>();

      var serviceResponse = await _issueStatusTypesService.GetAll();
      if (serviceResponse.Success && serviceResponse.Data != null)
      {
        response.Rows = serviceResponse.Data;
        response.RowCount = serviceResponse.Data.Count();
        response.StatusCode = Convert.ToInt16(HttpStatusCode.OK);

        return Ok(response);
      }

      return Problem(response.ErrorMessage);
    }

    return BadRequest();
  }
}