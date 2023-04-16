using Utils;

public interface IIssuePriorityTypesService
{
  Task<ServiceResponse<List<GetIssuePriorityTypeDto>>> GetAll();
}