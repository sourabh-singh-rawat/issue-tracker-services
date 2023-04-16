using Utils;

public class IssuePriorityTypesService : IIssuePriorityTypesService
{
  private readonly IIssueStatusTypesRepository _issueStatusTypesRepository;

  public IssuePriorityTypesService(IIssueStatusTypesRepository issueStatusTypesRepository)
  {
    _issueStatusTypesRepository = issueStatusTypesRepository;
  }

  public async Task<ServiceResponse<List<GetIssuePriorityTypeDto>>> GetAll()
  {
    var serviceResponse = new ServiceResponse<List<GetIssuePriorityTypeDto>>();
    try
    {
      var repoResponse = await _issueStatusTypesRepository.Find();

      if (repoResponse.Success && repoResponse.Data != null)
      {
        var issuePriorityTypes = repoResponse.Data.Select((p) => new GetIssuePriorityTypeDto()
        {
          Id = p.Id,
          Name = p.Name,
          RankOrder = p.RankOrder,
          Description = p.Description,
          CreatedAt = p.CreatedAt,
          UpdatedAt = p.UpdatedAt,
          DeletedAt = p.DeletedAt
        }).ToList();
        serviceResponse.Data = issuePriorityTypes;
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