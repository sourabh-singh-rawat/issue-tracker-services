import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "issue_assignee" })
export class IssueAssigneeEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issue_assignee_pkey",
  })
  id!: string;

  @Column({ name: "issue_id", type: "uuid" })
  issueId!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;
}
