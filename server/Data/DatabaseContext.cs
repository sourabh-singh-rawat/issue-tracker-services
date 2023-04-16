using Microsoft.EntityFrameworkCore;
using Data.Entities;

namespace Data;

public class DatabaseContext : DbContext
{
  public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

  public DbSet<UsersEntity> Users { get; set; }
  public DbSet<TeamsEntity> Teams { get; set; }
  public DbSet<ProjectsEntity> Projects { get; set; }
  public DbSet<ProjectStatusTypesEntity> ProjectStatusTypes { get; set; }
  public DbSet<ProjectMembersEntity> ProjectMembers { get; set; }
  public DbSet<ProjectMemberRolesEntity> ProjectMemberRoles { get; set; }
  public DbSet<ProjectActivitiesEntity> ProjectActivities { get; set; }
  public DbSet<ProjectActivityTypesEntity> ProjectActivityTypes { get; set; }
  public DbSet<IssuesEntity> Issues { get; set; }
  public DbSet<IssueTasksEntity> IssueTasks { get; set; }
  public DbSet<IssueStatusTypesEntity> IssueStatusTypes { get; set; }
  public DbSet<IssuePriorityTypesEntity> IssuePriorityTypes { get; set; }
  public DbSet<IssueCommentsEntity> IssueComments { get; set; }
  public DbSet<IssueAttachmentsEntity> IssueAttachments { get; set; }
  public DbSet<IssueActivityTypesEntity> IssueActivityTypes { get; set; }
  public DbSet<ProjectIssuesStatusCountGetDto> ProjectIssuesStatusCountGetDto { get; set; }
  public DbSet<ProjectMembersModel> ProjectMembersModel { get; set; }
}