using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Utils;

namespace Data.Repositories;

public class ProjectStatusTypesRepository : IProjectStatusTypesRepository
{
  private readonly DatabaseContext _context;

  public ProjectStatusTypesRepository(DatabaseContext context)
  {
    _context = context;
  }

  public async Task<RepositoryResponse<List<ProjectStatusTypesEntity>>> Find()
  {
    var repoResponse = new RepositoryResponse<List<ProjectStatusTypesEntity>>();
    try
    {
      var projectStatusTypes = await _context.ProjectStatusTypes.ToListAsync();

      repoResponse.Data = projectStatusTypes;
      repoResponse.Success = true;
      repoResponse.ErrorMessage = "";

      return repoResponse;
    }
    catch (Exception ex)
    {
      repoResponse.Data = null;
      repoResponse.Success = false;
      repoResponse.ErrorMessage = ex.ToString();
      return repoResponse;
    }

  }
}