using Data.Entities;
using Data.Repositories;
using Dtos.Project;
using Services;
using Utils;

class ProjectService : IProjectService
{
  private readonly IProjectRepository _projectRepository;

  public ProjectService(IProjectRepository projectRepository)
  {
    _projectRepository = projectRepository;
  }

  public async Task<ServiceResponse<Guid>> Create(string uid, ProjectPostDto project)
  {
    var serviceResponse = new ServiceResponse<Guid>();
    var projectToAdd = new ProjectsEntity()
    {
      Name = project.Name,
      Description = project.Description,
      Status = project.Status,
      StartDate = project.StartDate,
      EndDate = project.EndDate
    };
    var repoResponse = await _projectRepository.InsertOne(projectToAdd, uid);
    var createdProject = repoResponse.Data;
    if (createdProject != null)
    {

      serviceResponse.Data = repoResponse.Data;
      serviceResponse.Success = true;

      return serviceResponse;
    }

    serviceResponse.Success = false;
    return serviceResponse;
  }

  public async Task<ServiceResponse<List<ProjectGetDto>>> GetAll(string uid)
  {
    var serviceResponse = new ServiceResponse<List<ProjectGetDto>>();

    try
    {
      var repoResponse = await _projectRepository.Find(uid);

      if (repoResponse.Success)
      {
        var projects = repoResponse.Data;
        if (projects != null)
        {
          var projectsDto = projects.Select(project => new ProjectGetDto()
          {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            Status = project.Status,
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt,
            DeletedAt = project.DeletedAt
          }).ToList();

          serviceResponse.Data = projectsDto;
          serviceResponse.Success = true;
          return serviceResponse;
        }

        serviceResponse.ErrorMessage = "No projects found";
        serviceResponse.Success = false;
        return serviceResponse;
      };

      serviceResponse.ErrorMessage = repoResponse.ErrorMessage;
      return serviceResponse;
    }
    catch (Exception ex)
    {
      serviceResponse.ErrorMessage = ex.ToString();
      return serviceResponse;
    }
  }

  public async Task<ServiceResponse<ProjectGetDto>> GetById(Guid id, string uid)
  {
    var serviceResponse = new ServiceResponse<ProjectGetDto>();
    var repoResponse = await _projectRepository.FindOne(id, uid);
    if (repoResponse.Success && repoResponse.Data != null)
    {
      var project = repoResponse.Data;
      var projectDto = new ProjectGetDto()
      {
        Id = project.Id,
        Name = project.Name,
        Description = project.Description,
        Status = project.Status,
        StartDate = project.StartDate,
        EndDate = project.EndDate,
        OwnerId = project.OwnerId,
        CreatedAt = project.CreatedAt,
        UpdatedAt = project.UpdatedAt,
        DeletedAt = project.DeletedAt
      };
      serviceResponse.Data = projectDto;
      serviceResponse.Success = true;
      return serviceResponse;
    }

    repoResponse.ErrorMessage = "Project not found";
    return serviceResponse;
  }

  public async Task<ServiceResponse<List<ProjectMembersGetDto>>> GetAllMembers(Guid projectId, string uid)
  {
    var serviceResponse = new ServiceResponse<List<ProjectMembersGetDto>>();
    try
    {
      var repoResponse = await _projectRepository.FindMembers(projectId, uid);

      if (repoResponse.Success && repoResponse.Data != null)
      {
        var projectMember = repoResponse.Data.Select((pm) => new ProjectMembersGetDto()
        {
          Id = pm.Id,
          Name = pm.Name,
          Email = pm.Email,
          PhotoUrl = pm.PhotoUrl,
          ProjectId = pm.ProjectId,
          UserId = pm.UserId,
          MemberRole = pm.MemberRole,
          CreatedAt = pm.CreatedAt,
          UpdatedAt = pm.UpdatedAt,
          DeletedAt = pm.DeletedAt

        }).ToList();

        serviceResponse.Success = true;
        serviceResponse.Data = projectMember;
        return serviceResponse;
      }

      return serviceResponse;
    }
    catch (Exception ex)
    {
      serviceResponse.ErrorMessage = ex.ToString();
      return serviceResponse;
    }
  }

  public async Task<ServiceResponse<List<ProjectIssuesStatusCountGetDto>>> GetAllIssuesStatusCount(Guid projectId, string uid)
  {
    var serviceResponse = new ServiceResponse<List<ProjectIssuesStatusCountGetDto>>();
    try
    {
      var repoResponse = await _projectRepository.FindIssuesStatusCount(projectId, uid);
      if (repoResponse.Success)
      {
        serviceResponse.Data = repoResponse.Data;
        serviceResponse.Success = true;
        return serviceResponse;
      }

      return serviceResponse;
    }
    catch (Exception ex)
    {
      serviceResponse.ErrorMessage = ex.ToString();
      return serviceResponse;
    }
  }
}