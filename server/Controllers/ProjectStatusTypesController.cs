using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Utils;
using Data.Entities;
using Services;

[Authorize]
[ApiController]
[Route("api/projects/status")]
[Produces("application/json")]
public class ProjectStatusTypesController : ControllerBase
{
  private readonly IProjectStatusTypesService _projectStatusTypesService;

  public ProjectStatusTypesController(IProjectStatusTypesService projectStatusTypesService)
  {
    _projectStatusTypesService = projectStatusTypesService;
  }

  [HttpGet]
  public async Task<ActionResult<ListApiResponse<List<ProjectStatusTypeDto>>>> GetAll()
  {
    var response = new ListApiResponse<List<ProjectStatusTypeDto>>();
    try
    {
      var serviceResponse = await _projectStatusTypesService.GetAll();

      if (serviceResponse.Data != null && serviceResponse.Success)
      {
        response.Rows = serviceResponse.Data;
        response.RowCount = serviceResponse.Data.Count;
        response.StatusCode = Convert.ToInt32(HttpStatusCode.OK);
        return Ok(response);
      }

      response.StatusCode = Convert.ToInt32(HttpStatusCode.InternalServerError);
      return NotFound(response);
    }
    catch (Exception ex)
    {
      response.Rows = null;
      response.RowCount = 0;
      response.StatusCode = Convert.ToInt32(HttpStatusCode.InternalServerError);
      response.ErrorMessage = ex.ToString();
      return NotFound(response);
    }
  }

  [HttpPatch]
  [Route("{id}")]
  public ActionResult Update(Guid id)
  {
    return Ok(id);
  }
}