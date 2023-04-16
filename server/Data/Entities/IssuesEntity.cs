using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("issues")]
public class IssuesEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("name")]
  [MaxLength(255)]
  public string? Name { get; set; }

  [Column("description")]
  [MaxLength(4000)]
  public string? Description { get; set; }

  [Column("status")]
  public Guid Status { get; set; }

  [Column("priority")]
  public Guid Priority { get; set; }

  [Column("reporter_id")]
  public Guid ReporterId { get; set; }

  [Column("project_id")]
  public Guid ProjectId { get; set; }

  [Column("assignee_id")]
  public Guid AssigneeId { get; set; }

  [Column("due_date")]
  public DateTime DueDate { get; set; }

  [Column("created_at")]
  public DateTime? CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime? UpdatedAt { get; set; }

  [Column("deleted_at")]
  public DateTime? DeletedAt { get; set; }
}