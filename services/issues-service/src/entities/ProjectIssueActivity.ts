import { ProjectActivity } from "@pine/common";
import { Audit } from "@pine/orm";
import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity({ name: "list_item_activities" })
export class ProjectIssueActivity extends Audit {
  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @Column({ type: "text" })
  action!: ProjectActivity;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @Column({ name: "old_value", type: "text", nullable: true })
  oldValue?: string;

  @Column({ name: "new_value", type: "text", nullable: true })
  newValue?: string;
}
