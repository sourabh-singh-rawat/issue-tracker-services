import { Audit } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Issue } from "./Issue";
import { User } from "./User";

@Entity({ name: "item_assignees" })
export class IssueAssignee extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @JoinColumn({ name: "item_id" })
  issueId!: string;

  @ManyToOne(() => Issue, ({ assignees }) => assignees)
  issue!: Issue;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user!: User;
}
