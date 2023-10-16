import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "issues" })
export class IssueEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issues_pkey",
  })
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "text" })
  status!: string;

  @Column({ type: "text" })
  priority!: string;

  @Column({ type: "boolean", default: false })
  resolution?: boolean;

  @Column({ name: "owner_id", type: "uuid" })
  ownerId!: string;

  @Column({ name: "reporter_id", type: "uuid" })
  reporterId!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @Column({
    name: "due_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  dueDate?: Date;
}
