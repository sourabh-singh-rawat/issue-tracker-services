import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { ProjectEntity } from "./project.entity";
import { IssueAssigneeEntity } from "./issue-assignee.entity";
import { AuditEntity } from "@issue-tracker/orm";

@Entity({ name: "issues" })
export class IssueEntity extends AuditEntity {
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

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "reporter_id" })
  reporter!: UserEntity;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: "project_id" })
  project!: ProjectEntity;

  @Column({
    name: "due_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  dueDate?: Date;

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @ManyToOne(() => UserEntity)
  createdBy!: UserEntity;

  @Column({ name: "updated_by_id", type: "uuid", nullable: true })
  updatedById?: string;

  @ManyToOne(() => UserEntity)
  updatedBy?: UserEntity;

  @OneToMany(() => IssueAssigneeEntity, ({ issue }) => issue)
  assignees!: IssueAssigneeEntity;
}
