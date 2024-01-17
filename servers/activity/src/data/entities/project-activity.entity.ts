import { AuditEntity, ProjectActivity } from "@sourabhrawatcc/core-utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "project_activities" })
export class ProjectActivityEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "project_activities_pkey",
  })
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @Column({ type: "text" })
  action!: ProjectActivity;

  @Column({ name: "timestamp", type: "timestamp with time zone" })
  timestamp!: Date;

  @Column({ name: "old_value", type: "text", nullable: true })
  oldValue?: string;

  @Column({ name: "new_value", type: "text", nullable: true })
  newValue?: string;
}
