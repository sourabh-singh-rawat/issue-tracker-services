using Data.Entities;
using Dtos.User;
using Utils;

namespace Services;

public interface IUserService
{
  Task<ServiceResponse<UsersEntity>> AddUser(UserPostDto user);
}