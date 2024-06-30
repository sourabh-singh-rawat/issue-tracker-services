import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { WorkspaceEntity } from "./workspace.entity";
import { UserEntity } from "./user.entity";
import { AuditEntity } from "@issue-tracker/orm";
import {
  WORKSPACE_MEMBER_ROLES,
  WORKSPACE_MEMBER_STATUS,
  WorkspaceMemberRoles,
  WorkspaceMemberStatus,
} from "@issue-tracker/common";

@Entity({ name: "workspace_members" })
export class WorkspaceMemberEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UserEntity)
  @Column({ name: "user_id", type: "uuid" })
  @JoinColumn({ name: "user_id" })
  userId!: string;

  @ManyToOne(() => WorkspaceEntity)
  @Column({ name: "workspace_id", type: "uuid" })
  @JoinColumn({ name: "workspace_id" })
  workspaceId!: string;

  @Column({
    type: "enum",
    default: WORKSPACE_MEMBER_STATUS.PENDING,
    enum: [
      WORKSPACE_MEMBER_STATUS.ACTIVE,
      WORKSPACE_MEMBER_STATUS.BLOCKED,
      WORKSPACE_MEMBER_STATUS.DELETED,
      WORKSPACE_MEMBER_STATUS.INVITED,
      WORKSPACE_MEMBER_STATUS.PENDING,
      WORKSPACE_MEMBER_STATUS.REMOVED,
      WORKSPACE_MEMBER_STATUS.SUSPENED,
    ],
  })
  status!: WorkspaceMemberStatus;

  @Column({
    type: "enum",
    default: WORKSPACE_MEMBER_ROLES.MEMBER,
    enum: [
      WORKSPACE_MEMBER_ROLES.ADMIN,
      WORKSPACE_MEMBER_ROLES.MEMBER,
      WORKSPACE_MEMBER_ROLES.OWNER,
    ],
  })
  role!: WorkspaceMemberRoles;
}
