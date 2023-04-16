using Data.Entities;
using Utils;

namespace Data.Repositories;

public interface IUserRepository
{
  Task<bool> UserExists(string uid);
  Guid GetUserIdByUid(string uid);
  Task<RepositoryResponse<UsersEntity>> AddUser(UsersEntity user);
  Task<RepositoryResponse<UsersEntity>> GetUser(Guid id);
  // Task<RepositoryResponse<UsersEntity>> UpdateUser(UsersEntity user);
  // Task<RepositoryResponse<UsersEntity>> DeleteUser(Guid id);
}