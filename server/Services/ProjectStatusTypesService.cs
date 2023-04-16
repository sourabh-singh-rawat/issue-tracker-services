using Data.Repositories;
using Utils;

namespace Services;

public class ProjectStatusTypesService : IProjectStatusTypesService
{
  private readonly IProjectStatusTypesRepository _projectStatusTypesRepository;

  public ProjectStatusTypesService(IProjectStatusTypesRepository projectStatusTypesRepository)
  {
    _projectStatusTypesRepository = projectStatusTypesRepository;
  }

  public async Task<ServiceResponse<List<ProjectStatusTypeDto>>> GetAll()
  {
    var serviceResponse = new ServiceResponse<List<ProjectStatusTypeDto>>();
    try
    {
      var repoResponse = await _projectStatusTypesRepository.Find();

      if (repoResponse.Data != null && repoResponse.Success)
      {
        serviceResponse.Data = repoResponse.Data.Select(s => new ProjectStatusTypeDto()
        {
          Id = s.Id,
          RankOrder = s.RankOrder,
          Name = s.Name,
          Description = s.Description,
          Color = s.Color,
          CreatedAt = s.CreatedAt,
          UpdatedAt = s.UpdatedAt
        }).ToList();
        serviceResponse.Success = true;
        serviceResponse.ErrorMessage = "";

        return serviceResponse;
      }

      serviceResponse.Data = null;
      serviceResponse.ErrorMessage = repoResponse.ErrorMessage;
      serviceResponse.Success = false;

      return serviceResponse;
    }
    catch (Exception ex)
    {
      serviceResponse.Data = null;
      serviceResponse.Success = false;
      serviceResponse.ErrorMessage = ex.ToString();

      return serviceResponse;
    }
  }
}