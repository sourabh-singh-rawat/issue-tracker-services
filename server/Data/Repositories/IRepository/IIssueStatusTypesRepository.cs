using Data.Entities;
using Utils;

public interface IIssueStatusTypesRepository
{
  Task<RepositoryResponse<List<IssueStatusTypesEntity>>> Find();
}