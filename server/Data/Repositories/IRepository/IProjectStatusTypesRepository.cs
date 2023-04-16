using Data.Entities;
using Utils;

namespace Data.Repositories;

public interface IProjectStatusTypesRepository
{
  Task<RepositoryResponse<List<ProjectStatusTypesEntity>>> Find();
}