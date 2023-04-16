public class ProjectMembersGetDto
{
  public string Name { get; set; }
  public string Email { get; set; }
  public string PhotoUrl { get; set; }
  public Guid Id { get; set; }
  public Guid ProjectId { get; set; }
  public Guid UserId { get; set; }
  public Guid MemberRole { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? UpdatedAt { get; set; }
  public DateTime? DeletedAt { get; set; }
}