import { AuditEntity } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "attachments" })
export class Attachment extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  filename!: string;

  @Column({ name: "original_filename", type: "text" })
  originalFilename!: string;

  @Column({ name: "content_type", type: "text" })
  contentType!: string;

  @Column({ name: "thumbnail_link", type: "text" })
  thumbnailLink!: string;

  @Column({ type: "text" })
  bucket!: string;

  @Column({ name: "owner_id", type: "uuid" })
  ownerId!: string;

  @Column({ name: "issue_id", type: "uuid" })
  itemId!: string;
}
