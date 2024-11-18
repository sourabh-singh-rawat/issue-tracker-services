import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { List } from "./List";
import { IssueAssigneeEntity } from "./issue-assignee.entity";
import { AuditEntity } from "@issue-tracker/orm";

@Entity({ name: "list_items" })
export class ListItem extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issues_pkey",
  })
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text" })
  status!: string;

  @Column({ type: "text" })
  priority!: string;

  @Column({ type: "boolean", default: false })
  resolution!: boolean;

  @Column({ name: "reporter_id" })
  reporterId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "reporter_id" })
  reporter!: User;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @ManyToOne(() => List)
  @JoinColumn({ name: "project_id" })
  project!: List;

  @Column({
    name: "due_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  dueDate?: Date;

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @ManyToOne(() => User)
  createdBy!: User;

  @Column({ name: "updated_by_id", type: "uuid", nullable: true })
  updatedById?: string;

  @ManyToOne(() => User)
  updatedBy?: User;

  @OneToMany(() => IssueAssigneeEntity, ({ issue }) => issue)
  assignees!: IssueAssigneeEntity;
}
