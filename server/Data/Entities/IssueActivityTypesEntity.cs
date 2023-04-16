using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("issue_activity_types")]
public class IssueActivityTypesEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("name")]
  [MaxLength(255)]
  public string? Name { get; set; }

  [Column("description")]
  [MaxLength(3000)]
  public string? Description { get; set; }
}