import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { AuditEntity } from "@issue-tracker/orm";
import { WORKSPACE_STATUS, WorkspaceStatus } from "@issue-tracker/common";

@Entity({ name: "workspaces" })
export class WorkspaceEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "workspaces_pkey",
  })
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "owner_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "workspaces_fkey",
  })
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
