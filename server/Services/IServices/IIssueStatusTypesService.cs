using Dtos.Issues;
using Utils;

public interface IIssueStatusTypesService
{
  public Task<ServiceResponse<List<GetIssueStatusTypeDto>>> GetAll();
}