using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("issue_tasks")]
public class IssueTasksEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("description")]
  [MaxLength(255)]
  public string? Description { get; set; }

  [Column("issue_id")]
  public Guid IssueId { get; set; }

  [Column("member_id")]
  public Guid MemberId { get; set; }

  [Column("completed")]
  public bool Completed { get; set; }

  [Column("due_date")]
  public DateTime? DueDate { get; set; }

  [Column("created_at")]
  public DateTime? CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime? UpdatedAt { get; set; }

  [Column("deleted_at")]
  public DateTime? DeletedAt { get; set; }
}