using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Utils;

namespace Data.Repositories;

class ProjectRepository : IProjectRepository
{
  private readonly DatabaseContext _context;
  private readonly IUserRepository _userRepository;

  public ProjectRepository(DatabaseContext context, IUserRepository userRepository)
  {
    _context = context;
    _userRepository = userRepository;
  }

  public async Task<RepositoryResponse<Guid>> InsertOne(ProjectsEntity project, string uid)
  {
    var repoResponse = new RepositoryResponse<Guid>();
    try
    {
      var ownerId = _userRepository.GetUserIdByUid(uid);
      var newProject = new ProjectsEntity()
      {
        Name = project.Name,
        OwnerId = ownerId,
        StartDate = project.StartDate,
        EndDate = project.EndDate,
        Status = project.Status,
        Description = project.Description,
      };

      await _context.Projects.AddAsync(newProject);
      await _context.SaveChangesAsync();

      repoResponse.Success = true;
      repoResponse.Data = newProject.Id;
      return repoResponse;
    }
    catch (Exception ex)
    {
      repoResponse.ErrorMessage = ex.ToString();
      return repoResponse;
    }
  }

  public async Task<RepositoryResponse<List<ProjectsEntity>>> Find(string uid)
  {
    var repoResponse = new RepositoryResponse<List<ProjectsEntity>>();
    try
    {
      var ownerId = _userRepository.GetUserIdByUid(uid);
      var parameters = new List<NpgsqlParameter>() {
        new NpgsqlParameter("@userId", NpgsqlTypes.NpgsqlDbType.Uuid) { Value = ownerId }
      };
      var projects = await _context.Projects
        .FromSqlRaw(@"SELECT * FROM fn_projects_find(@userId)", parameters[0])
        .ToListAsync();

      repoResponse.Success = true;
      repoResponse.Data = projects;
    }
    catch (Exception ex)
    {
      repoResponse.ErrorMessage = ex.ToString();
    }

    return repoResponse;
  }

  public async Task<RepositoryResponse<ProjectsEntity>> FindOne(Guid id, string uid)
  {
    var repoResponse = new RepositoryResponse<ProjectsEntity>();
    try
    {
      var ownerId = _userRepository.GetUserIdByUid(uid);
      var parameters = new List<NpgsqlParameter>() {
      new NpgsqlParameter("@projectid", NpgsqlTypes.NpgsqlDbType.Uuid) { Value = id },
      new NpgsqlParameter("@memberuserid", NpgsqlTypes.NpgsqlDbType.Uuid) { Value = ownerId }
    };

      var project = await _context.Projects
          .FromSqlRaw(@"SELECT * FROM fn_find_project(@projectid, @memberuserid)", parameters[0], parameters[1])
          .AsNoTracking()
          .FirstOrDefaultAsync();

      if (project != null)
      {
        repoResponse.Success = true;
        repoResponse.Data = project;
        return repoResponse;
      }

      return repoResponse;
    }
    catch (Exception ex)
    {
      repoResponse.ErrorMessage = ex.ToString();
      return repoResponse;
    }
  }

  public async Task<RepositoryResponse<List<ProjectMembersModel>>> FindMembers(Guid id, string uid)
  {
    var repoResponse = new RepositoryResponse<List<ProjectMembersModel>>();
    try
    {
      var memberId = _userRepository.GetUserIdByUid(uid);
      var parameters = new List<NpgsqlParameter>() {
        new NpgsqlParameter("@projectid", NpgsqlTypes.NpgsqlDbType.Uuid) { Value = id },
        new NpgsqlParameter("@memberuserid", NpgsqlTypes.NpgsqlDbType.Uuid) { Value = memberId }
      };

      var members = await _context.ProjectMembersModel
        .FromSqlRaw(@"SELECT * FROM fn_project_members_find(@projectid, @memberuserid)", parameters[0], parameters[1])
        .ToListAsync();

      repoResponse.Success = true;
      repoResponse.Data = members;
      return repoResponse;
    }
    catch (Exception ex)
    {
      repoResponse.ErrorMessage = ex.ToString();
      return repoResponse;
    }
  }

  public async Task<RepositoryResponse<ProjectsEntity>> UpdateOne(ProjectsEntity project)
  {
    throw new NotImplementedException();
  }

  public async Task<RepositoryResponse<List<ProjectIssuesStatusCountGetDto>>> FindIssuesStatusCount(Guid id, string uid)
  {
    var memberId = _userRepository.GetUserIdByUid(uid);
    var repoResponse = new RepositoryResponse<List<ProjectIssuesStatusCountGetDto>>();
    var parameters = new List<NpgsqlParameter>() {
      new NpgsqlParameter("@projectid", NpgsqlTypes.NpgsqlDbType.Uuid) { Value = id },
      new NpgsqlParameter("@memberuserid", NpgsqlTypes.NpgsqlDbType.Uuid) { Value = memberId },
    };

    try
    {
      var issuesStatusCount = await _context.ProjectIssuesStatusCountGetDto
        .FromSqlRaw<ProjectIssuesStatusCountGetDto>("SELECT * FROM fn_get_project_issues_status_count(@projectid, @memberuserid)", parameters[0], parameters[1])
        .ToListAsync();

      if (issuesStatusCount != null)
      {
        repoResponse.Success = true;
        repoResponse.Data = issuesStatusCount;
        return repoResponse;
      }

      return repoResponse;
    }
    catch (Exception ex)
    {
      repoResponse.ErrorMessage = ex.ToString();
      return repoResponse;
    }
  }

  public async Task<RepositoryResponse<ProjectsEntity>> DeleteOne(Guid id)
  {
    throw new NotImplementedException();
  }
}