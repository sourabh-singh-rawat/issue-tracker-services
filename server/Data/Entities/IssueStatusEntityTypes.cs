using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("issue_status_types")]
public class IssueStatusTypesEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("rank_order")]
  public int RankOrder { get; set; }

  [Column("name")]
  public string? Name { get; set; }

  [Column("description")]
  public string? Description { get; set; }

  [Column("color")]
  [MaxLength(7)]
  public String? Color { get; set; }

  [Column("created_at")]
  public DateTime? CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime? UpdatedAt { get; set; }

  [Column("deleted_at")]
  public DateTime? DeletedAt { get; set; }
}