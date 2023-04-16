using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Utils;

public class IssueStatusTypesRepository : IIssueStatusTypesRepository
{
  private readonly DatabaseContext _context;

  public IssueStatusTypesRepository(DatabaseContext context)
  {
    _context = context;
  }
  public async Task<RepositoryResponse<List<IssueStatusTypesEntity>>> Find()
  {
    var repoResponse = new RepositoryResponse<List<IssueStatusTypesEntity>>();

    try
    {
      var parameters = new List<NpgsqlParameter>() { };
      var issueStatusTypes = await _context.IssueStatusTypes
        .FromSqlRaw(@"SELECT * FROM fn_issue_status_types()")
        .ToListAsync();

      repoResponse.Data = issueStatusTypes;
      repoResponse.Success = true;
    }
    catch (Exception ex)
    {
      repoResponse.ErrorMessage = ex.ToString();
    }

    return repoResponse;
  }
}