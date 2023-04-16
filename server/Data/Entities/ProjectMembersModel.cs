using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

public class ProjectMembersModel
{
  [Column("name")]
  public string Name { get; set; }
  [Column("email")]
  public string Email { get; set; }
  [Column("photo_url")]
  public string PhotoUrl { get; set; }
  [Column("id")]
  public Guid Id { get; set; }
  [Column("project_id")]
  public Guid ProjectId { get; set; }
  [Column("member_user_id")]
  public Guid UserId { get; set; }
  [Column("member_role")]
  public Guid MemberRole { get; set; }
  [Column("created_at")]
  public DateTime CreatedAt { get; set; }
  [Column("updated_at")]
  public DateTime? UpdatedAt { get; set; }
  [Column("deleted_at")]
  public DateTime? DeletedAt { get; set; }
}