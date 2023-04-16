namespace Dtos.Project;

public class ProjectGetDto
{
  public Guid Id { get; set; }
  public string? Name { get; set; }
  public string? Description { get; set; }
  public Guid Status { get; set; }
  public Guid OwnerId { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? UpdatedAt { get; set; }
  public DateTime? DeletedAt { get; set; }
}