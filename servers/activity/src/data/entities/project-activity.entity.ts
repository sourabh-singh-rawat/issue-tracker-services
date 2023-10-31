import { AuditEntity, ProjectActivity } from "@sourabhrawatcc/core-utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "project_activities" })
export class ProjectActivityEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "project_activities_pkey",
  })
  id!: string;

  @Column({ type: "text" })
  type!: ProjectActivity;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "timestamp", type: "timestamp with time zone" })
  timestamp!: Date;
}
