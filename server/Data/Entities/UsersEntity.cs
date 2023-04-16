using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("users")]
public class UsersEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("name")]
  [MaxLength(255)]
  public string? Name { get; set; }

  [Required]
  [Column("uid")]
  [MaxLength(255)]
  public string Uid { get; set; }

  [Required]
  [Column("email")]
  [MaxLength(255)]
  public string Email { get; set; }

  [Column("photo_url")]
  [MaxLength(500)]
  public string PhotoUrl { get; set; }

  [Column("created_at")]
  [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
  public DateTime CreatedAt { get; set; }

  [Column("updated_at")]
  [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
  public DateTime? UpdatedAt { get; set; }

  [Column("deleted_at")]
  [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
  public DateTime? DeletedAt { get; set; }
}