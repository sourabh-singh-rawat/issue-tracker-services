using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Utils;

public class IssuePriorityTypesRepository : IIssuePriorityTypesRepository
{
  private readonly DatabaseContext _context;

  public IssuePriorityTypesRepository(DatabaseContext context)
  {
    _context = context;
  }

  public async Task<RepositoryResponse<List<IssuePriorityTypesEntity>>> Find()
  {
    var repoResponse = new RepositoryResponse<List<IssuePriorityTypesEntity>>();

    try
    {
      var issuePriorityTypes = await _context.IssuePriorityTypes
      .FromSqlRaw(@"SELECT * FROM fn_issue_priority_types()")
      .ToListAsync();

      repoResponse.Data = issuePriorityTypes;
      repoResponse.Success = true;
    }
    catch (Exception ex)
    {
      repoResponse.ErrorMessage = ex.ToString();
    }

    return repoResponse;
  }
}