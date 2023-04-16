using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("project_activity_types")]
public class ProjectActivityTypesEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("name")]
  public string? Name { get; set; }

  [Column("description")]
  public string? Description { get; set; }

  [Column("created_at")]
  public DateTime? CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime? UpdatedAt { get; set; }

  [Column("deleted_at")]
  public DateTime? DeletedAt { get; set; }
}