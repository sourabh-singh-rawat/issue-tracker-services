import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { IssueEntity } from "./issue.entity";

@Entity({ name: "issue_assignees" })
export class IssueAssigneeEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issue_assignees_pkey",
  })
  id!: string;

  @ManyToOne(() => IssueEntity)
  @JoinColumn({ name: "issue_id" })
  issueId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  userId!: string;
}
