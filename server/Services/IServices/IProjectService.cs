using Data.Entities;
using Dtos.Project;
using Utils;

namespace Services;

public interface IProjectService
{
  Task<ServiceResponse<Guid>> Create(string uid, ProjectPostDto project);
  Task<ServiceResponse<List<ProjectGetDto>>> GetAll(string uid);
  Task<ServiceResponse<ProjectGetDto>> GetById(Guid id, string uid);
  Task<ServiceResponse<List<ProjectMembersGetDto>>> GetAllMembers(Guid projectId, string uid);
  Task<ServiceResponse<List<ProjectIssuesStatusCountGetDto>>> GetAllIssuesStatusCount(Guid projectId, string uid);
}