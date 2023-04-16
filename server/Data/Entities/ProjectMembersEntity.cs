using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("project_members")]
public class ProjectMembersEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("project_id")]
  public Guid ProjectId { get; set; }

  [Column("member_user_id")]
  public Guid MemberUserId { get; set; }

  [Column("member_role")]
  public Guid MemberRole { get; set; }

  [Column("created_at")]
  public DateTime? CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime? UpdatedAt { get; set; }

  [Column("deleted_at")]
  public DateTime? DeletedAt { get; set; }
}