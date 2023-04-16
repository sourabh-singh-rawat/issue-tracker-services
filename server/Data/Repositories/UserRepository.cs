using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Utils;

namespace Data.Repositories;

public class UserRepository : IUserRepository
{
  private readonly DatabaseContext _context;

  public UserRepository(DatabaseContext context)
  {
    _context = context;
  }

  public async Task<bool> UserExists(string uid)
  {
    var user = await _context.Users.FirstOrDefaultAsync((u) => u.Uid == uid);
    if (user != null)
    {
      return true;
    }
    return false;
  }

  public Guid GetUserIdByUid(string uid)
  {
    var user = _context.Users.AsNoTracking().FirstOrDefault((u) => u.Uid == uid);
    return user.Id;
  }

  public async Task<RepositoryResponse<UsersEntity>> GetUser(Guid id)
  {
    var repoResponse = new RepositoryResponse<UsersEntity>();
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync((u) => u.Id == id);

      if (user != null)
      {
        repoResponse.Data = user;
        repoResponse.ErrorMessage = "";
        repoResponse.Success = true;

        return repoResponse;
      }

      repoResponse.Success = false;
      return repoResponse;
    }
    catch (Exception ex)
    {
      repoResponse.Data = null;
      repoResponse.ErrorMessage = ex.ToString();
      repoResponse.Success = false;
      return repoResponse;
    }
  }

  public async Task<RepositoryResponse<UsersEntity>> AddUser(UsersEntity user)
  {
    var repositoryResponse = new RepositoryResponse<UsersEntity>();

    try
    {
      var newUser = new UsersEntity()
      {
        Email = user.Email,
        Name = user.Name,
        PhotoUrl = user.PhotoUrl,
        Uid = user.Uid
      };
      await _context.Users.AddAsync(newUser);
      await _context.SaveChangesAsync();

      repositoryResponse.Data = newUser;
      repositoryResponse.Success = true;
      repositoryResponse.ErrorMessage = "";

      return repositoryResponse;
    }
    catch (Exception ex)
    {
      repositoryResponse.Data = null;
      repositoryResponse.Success = false;
      repositoryResponse.ErrorMessage = ex.ToString();

      return repositoryResponse;
    }
  }

}