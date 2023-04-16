using Data.Entities;
using Utils;

namespace Data.Repositories;

public interface IProjectRepository
{
  Task<RepositoryResponse<Guid>> InsertOne(ProjectsEntity project, string uid);
  Task<RepositoryResponse<List<ProjectsEntity>>> Find(string uid);
  Task<RepositoryResponse<ProjectsEntity>> FindOne(Guid id, string uid);
  public Task<RepositoryResponse<List<ProjectMembersModel>>> FindMembers(Guid id, string uid);
  public Task<RepositoryResponse<List<ProjectIssuesStatusCountGetDto>>> FindIssuesStatusCount(Guid id, string uid);
  Task<RepositoryResponse<ProjectsEntity>> UpdateOne(ProjectsEntity project);
  Task<RepositoryResponse<ProjectsEntity>> DeleteOne(Guid id);
}