using Dtos.Issues;
using Utils;

public class IssueStatusTypesService : IIssueStatusTypesService
{
  private readonly IIssueStatusTypesRepository _issueStatusTypesRepository;

  public IssueStatusTypesService(IIssueStatusTypesRepository issueStatusTypesRepository)
  {
    _issueStatusTypesRepository = issueStatusTypesRepository;
  }

  public async Task<ServiceResponse<List<GetIssueStatusTypeDto>>> GetAll()
  {
    var serviceResponse = new ServiceResponse<List<GetIssueStatusTypeDto>>();
    try
    {
      var repoResponse = await _issueStatusTypesRepository.Find();
      if (repoResponse.Success && repoResponse.Data != null)
      {
        var issueStatusTypesDto = repoResponse.Data.Select((t) => new GetIssueStatusTypeDto()
        {
          Id = t.Id,
          Color = t.Color,
          Name = t.Name,
          Description = t.Description,
          RankOrder = t.RankOrder,
          CreatedAt = t.CreatedAt,
          UpdatedAt = t.UpdatedAt,
          DeletedAt = t.DeletedAt,
        }).ToList();

        serviceResponse.Data = issueStatusTypesDto;
        serviceResponse.Success = true;
      }
    }
    catch (Exception ex)
    {
      serviceResponse.ErrorMessage = ex.ToString();
    }

    return serviceResponse;
  }
}