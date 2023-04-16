public class ProjectIssuesStatusCountGetDto
{
  public Guid Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public int Count { get; set; }
  public int WeeklyCount { get; set; }
}