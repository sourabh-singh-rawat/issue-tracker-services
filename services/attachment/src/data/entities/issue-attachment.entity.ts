import { AuditEntity } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "issue_attachments" })
export class IssueAttachmentEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issue_attachments_pkey",
  })
  id!: string;

  @Column({ type: "text" })
  filename!: string;

  @Column({ name: "original_filename", type: "text" })
  originalFilename!: string;

  @Column({ name: "content_type", type: "text" })
  contentType!: string;

  @Column({ type: "text" })
  path!: string;

  @Column({ type: "text" })
  bucket!: string;

  @Column({ name: "owner_id", type: "uuid" })
  ownerId!: string;

  @Column({ name: "issue_id", type: "uuid" })
  issueId!: string;
}
