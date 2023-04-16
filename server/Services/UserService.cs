using Data.Entities;
using Data.Repositories;
using Dtos.User;
using Services;
using Utils;

namespace Services;

public class UserService : IUserService
{
  private readonly IUserRepository _userRepository;

  public UserService(IUserRepository userRepository)
  {
    _userRepository = userRepository;
  }

  public async Task<ServiceResponse<UsersEntity>> AddUser(UserPostDto user)
  {
    var serviceResponse = new ServiceResponse<UsersEntity>();

    try
    {
      var isUserExists = await _userRepository.UserExists(user.Uid);
      if (isUserExists)
      {
        serviceResponse.Data = null;
        serviceResponse.Success = false;
        serviceResponse.ErrorMessage = "User already exists with this email address";
        return serviceResponse;
      }

      var newUser = new UsersEntity()
      {
        Name = user.Name,
        Email = user.Email,
        PhotoUrl = user.PhotoUrl,
        Uid = user.Uid
      };
      var repoResponse = await _userRepository.AddUser(newUser);
      if (repoResponse.Success)
      {
        serviceResponse.Data = repoResponse.Data;
        serviceResponse.Success = true;
        serviceResponse.ErrorMessage = "";
        return serviceResponse;
      }

      serviceResponse.Success = false;
      return serviceResponse;
    }
    catch (Exception ex)
    {
      serviceResponse.Data = null;
      serviceResponse.ErrorMessage = ex.ToString();
      serviceResponse.Success = true;

      return serviceResponse;
    }
  }
}