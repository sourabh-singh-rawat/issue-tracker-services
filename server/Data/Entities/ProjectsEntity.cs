using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("projects")]
public class ProjectsEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("name")]
  [MaxLength(255)]
  public string? Name { get; set; }

  [Column("description")]
  [MaxLength(255)]
  public string? Description { get; set; }

  [Column("status")]
  [Required]
  public Guid Status { get; set; }

  [Column("owner_id")]
  [Required]
  public Guid OwnerId { get; set; }

  [Column("start_date")]
  public DateTime? StartDate { get; set; }

  [Column("end_date")]
  public DateTime? EndDate { get; set; }

  [Column("created_at")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public DateTime CreatedAt { get; set; }

  [Column("updated_at")]
  [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
  public DateTime? UpdatedAt { get; set; }

  [Column("deleted_at")]
  [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
  public DateTime? DeletedAt { get; set; }
}