import { Audit } from "@pine/orm";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "@/entities/User";

@Entity({ name: "attachments" })
export class Attachment extends Audit {
  @Column({ type: "text" })
  filename!: string;

  @Column({ name: "original_filename", type: "text" })
  originalFilename!: string;

  @Column({ name: "content_type", type: "text" })
  contentType!: string;

  @Column({ name: "thumbnail_link", type: "text" })
  thumbnailLink!: string;

  @Column({ name: "image_link", type: "text" })
  imageLink!: string;

  @Column({ type: "text" })
  bucket!: string;

  @Column({ name: "owner_id", type: "uuid" })
  ownerId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "owner_id" })
  owner!: User;

  @Column({ name: "issue_id", type: "uuid" })
  issueId!: string;
}
