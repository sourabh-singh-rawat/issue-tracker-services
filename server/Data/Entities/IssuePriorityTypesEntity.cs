using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("issue_priority_types")]
public class IssuePriorityTypesEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("rank_order")]
  public int RankOrder { get; set; }

  [Column("name")]
  [MaxLength(255)]
  public string? Name { get; set; }

  [Column("description")]
  [MaxLength(3000)]
  public string? Description { get; set; }

  [Column("created_at")]
  public DateTime? CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime? UpdatedAt { get; set; }

  [Column("deleted_at")]
  public DateTime? DeletedAt { get; set; }
}