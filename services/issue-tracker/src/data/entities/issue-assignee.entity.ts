import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { ListItem } from "./ListItem";
import { AuditEntity } from "@issue-tracker/orm";

@Entity({ name: "issue_assignees" })
export class IssueAssigneeEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issue_assignees_pkey",
  })
  id!: string;

  @JoinColumn({ name: "issue_id" })
  issueId!: string;

  @ManyToOne(() => ListItem, ({ assignees }) => assignees)
  issue!: ListItem;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user!: User;
}
