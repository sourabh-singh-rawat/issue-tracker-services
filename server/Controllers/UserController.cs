using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Utils;
using Services;
using System.Text.Json;
using Dtos.User;
using System.Net;

[Authorize]
[ApiController]
[Route("/api/users")]
[Produces("application/json")]
public class UserController : ControllerBase
{
  private readonly IHttpContextAccessor _httpContextAccessor;
  private readonly IUserService _userService;

  public UserController(IHttpContextAccessor httpContextAccessor, IUserService userService)
  {
    _httpContextAccessor = httpContextAccessor;
    _userService = userService;
  }

  [HttpPost]
  public async Task<ActionResult<ApiResponse<UserPostDto>>> AddUser()
  {
    if (_httpContextAccessor != null && _httpContextAccessor.HttpContext != null)
    {
      var request = _httpContextAccessor.HttpContext.Request;
      var response = new ApiResponse<UserPostDto>();

      try
      {
        var options = new JsonSerializerOptions()
        {
          PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
          WriteIndented = true
        };
        var user = await JsonSerializer.DeserializeAsync<UserPostDto>(request.Body, options);
        if (user != null)
        {
          var serviceResponse = await _userService.AddUser(user);

          if (serviceResponse.Success)
          {
            var userPostDto = new UserPostDto()
            {
              Name = serviceResponse.Data.Name,
              Email = serviceResponse.Data.Email,
              PhotoUrl = serviceResponse.Data.PhotoUrl,
              Uid = serviceResponse.Data.Uid
            };

            response.Data = userPostDto;
            return Ok(response);
          }

          response.ErrorMessage = serviceResponse.ErrorMessage;
          return Conflict(response);
        }
        else
        {
          return BadRequest();
        }
      }
      catch (Exception ex)
      {
        response.ErrorMessage = ex.ToString();
        response.StatusCode = Convert.ToInt16(HttpStatusCode.InternalServerError);
        return BadRequest(response);
      }
    }

    return BadRequest();
  }
}