import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { AuditEntity } from "@issue-tracker/orm";
import { WORKSPACE_STATUS, WorkspaceStatus } from "@issue-tracker/common";

@Entity({ name: "workspaces" })
export class Workspace extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "owner_user_id", referencedColumnName: "id" })
  @Column({ name: "owner_user_id", type: "uuid", nullable: false })
  ownerUserId!: string;

  @Column({
    name: "status",
    default: WORKSPACE_STATUS.ACTIVE,
    enum: [
      WORKSPACE_STATUS.ACTIVE,
      WORKSPACE_STATUS.ARCHIVED,
      WORKSPACE_STATUS.DEFAULT,
      WORKSPACE_STATUS.PENDING,
      WORKSPACE_STATUS.TEMPLATE,
    ],
  })
  status!: WorkspaceStatus;
}
