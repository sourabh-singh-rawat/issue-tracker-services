import { AuditEntity } from "@sourabhrawatcc/core-utils";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { IssueEntity } from "./issue.entity";

@Entity({ name: "issue_assignees" })
export class IssueAssigneeEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issue_assignees_pkey",
  })
  id!: string;

  @JoinColumn({ name: "issue_id" })
  issueId!: string;

  @ManyToOne(() => IssueEntity, ({ assignees }) => assignees)
  issue!: IssueEntity;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity)
  user!: UserEntity;
}
