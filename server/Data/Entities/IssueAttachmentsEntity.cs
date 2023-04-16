using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("issue_attachments")]
public class IssueAttachmentsEntity
{
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Column("filename")]
  [MaxLength(255)]
  public string? FileName { get; set; }

  [Column("original_filename")]
  [MaxLength(255)]
  public string? OriginalFileName { get; set; }

  [Column("content_type")]
  [MaxLength(255)]
  public string? ContentType { get; set; }

  [Column("path")]
  [MaxLength(1000)]
  public string? Path { get; set; }

  [Column("bucket")]
  [MaxLength(255)]
  public string? Bucket { get; set; }

  [Column("variant")]
  [MaxLength(255)]
  public string? Variant { get; set; }

  [Column("owner_id")]
  public Guid OwnerId { get; set; }

  [Column("issue_id")]
  public Guid IssueId { get; set; }
}