using Utils;
using Data.Entities;

public interface IIssuePriorityTypesRepository
{
  Task<RepositoryResponse<List<IssuePriorityTypesEntity>>> Find();
}