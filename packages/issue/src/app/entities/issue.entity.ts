import { AuditEntity } from "@sourabhrawatcc/core-utils";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

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

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "reporter_id" })
  reporterId!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

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

  @Column({ name: "updated_by_id", type: "uuid" })
  updatedById?: string;

  @ManyToOne(() => UserEntity)
  updatedBy?: UserEntity;
}
