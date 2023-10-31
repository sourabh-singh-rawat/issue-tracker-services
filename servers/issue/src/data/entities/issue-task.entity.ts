import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "issue_tasks" })
export class IssueTaskEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issue_tasks_pkey",
  })
  id!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: "issue_id", type: "uuid" })
  issueId!: string;

  @Column({ name: "owner_id", type: "uuid" })
  ownerId!: string;

  @Column({ type: "boolean", default: false })
  completed?: boolean;

  @Column({
    name: "due_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  dueDate?: Date;
}
