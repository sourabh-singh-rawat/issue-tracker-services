using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("project_activities")]
public class ProjectActivitiesEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("project_id")]
  public string? ProjectId { get; set; }

  [Column("project_activity_type_id")]
  public string? ProjectActivityTypeId { get; set; }

  [Column("user_id")]
  public Guid UserId { get; set; }

  [Column("created_at")]
  public DateTime? CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime? UpdatedAt { get; set; }

  [Column("deleted_at")]
  public DateTime? DeletedAt { get; set; }
}