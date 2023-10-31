import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "issue_comments" })
export class IssueCommentEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issue_comments_pkey",
  })
  id!: string;

  @Column({ name: "description", type: "text" })
  description!: string;

  @Column({ name: "issue_id", type: "uuid" })
  issueId!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;
}
