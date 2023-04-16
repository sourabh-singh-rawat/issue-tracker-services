using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("project_status_types")]
public class ProjectStatusTypesEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("rank_order")]
  public int RankOrder { get; set; }

  [Column("name")]
  [MaxLength(55)]
  public string? Name { get; set; }

  [Column("description")]
  [MaxLength(255)]
  public string? Description { get; set; }

  [Column("color")]
  [MaxLength()]
  public string? Color { get; set; }

  [Column("created_at")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public DateTime CreatedAt { get; set; }

  [Column("updated_at")]
  [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
  public DateTime? UpdatedAt { get; set; }
}