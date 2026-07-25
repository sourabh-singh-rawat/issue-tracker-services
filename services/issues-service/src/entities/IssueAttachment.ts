import { Audit } from "@pine/orm";
import { Column, Entity } from "typeorm";

@Entity({ name: "issue_attachments" })
export class IssueAttachment extends Audit {
  @Column("text")
  name!: string;

  @Column({ name: "original_name", type: "text" })
  originalName!: string;

  @Column({ name: "mime_type", type: "text" })
  mimeType!: string;

  @Column({ name: "owner_id", type: "text" })
  ownerId!: string;

  @Column({ name: "issue_id", type: "text" })
  issueId!: string;

  @Column({ name: "bucket_name", type: "text" })
  bucketName?: string;

  @Column({ name: "path", type: "text" })
  path?: string;

  @Column({ name: "variant", type: "text" })
  variant?: string;
}
