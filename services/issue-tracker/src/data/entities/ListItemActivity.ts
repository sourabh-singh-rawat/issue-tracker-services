import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { ProjectActivity } from "@issue-tracker/common";
import { AuditEntity } from "@issue-tracker/orm";

@Entity({ name: "list_item_activities" })
export class ListItemActivity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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
