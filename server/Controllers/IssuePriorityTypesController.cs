using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Utils;

[Authorize]
[ApiController]
[Route("api/issues/priority")]
[Produces("application/json")]
public class IssuePriorityTypesController : ControllerBase
{
  private readonly IHttpContextAccessor _httpContextAccessor;
  private readonly IIssuePriorityTypesService _issuePriorityTypesService;

  public IssuePriorityTypesController(IHttpContextAccessor httpContextAccessor, IIssuePriorityTypesService issuePriorityTypesService)
  {
    _httpContextAccessor = httpContextAccessor;
    _issuePriorityTypesService = issuePriorityTypesService;
  }
  [HttpGet]
  public async Task<ActionResult<ListApiResponse<List<GetIssuePriorityTypeDto>>>> GetAll()
  {
    if (_httpContextAccessor != null && _httpContextAccessor.HttpContext != null)
    {
      var user = _httpContextAccessor.HttpContext.User;
      var request = _httpContextAccessor.HttpContext.Request;
      var response = new ListApiResponse<List<GetIssuePriorityTypeDto>>();

      try
      {
        var serviceResponse = await _issuePriorityTypesService.GetAll();

        if (serviceResponse.Success && serviceResponse.Data != null)
        {
          response.Rows = serviceResponse.Data;
          response.RowCount = serviceResponse.Data.Count();
          response.StatusCode = Convert.ToInt16(HttpStatusCode.OK);

          return response;
        }

        response.ErrorMessage = "Service Error";
        response.StatusCode = Convert.ToInt16(HttpStatusCode.NotFound);
        return response;
      }
      catch (Exception ex)
      {
        response.StatusCode = Convert.ToInt16(HttpStatusCode.InternalServerError);
        response.ErrorMessage = ex.ToString();
        return response;
      }
    }

    return BadRequest();
  }
}