using Utils;

namespace Services;

public interface IProjectStatusTypesService
{
  Task<ServiceResponse<List<ProjectStatusTypeDto>>> GetAll();
}