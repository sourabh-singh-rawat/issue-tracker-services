public class ProjectStatusTypeDto
{
  public Guid Id { get; set; }
  public int RankOrder { get; set; }
  public string? Name { get; set; }
  public string? Description { get; set; }
  public string? Color { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? UpdatedAt { get; set; }
}