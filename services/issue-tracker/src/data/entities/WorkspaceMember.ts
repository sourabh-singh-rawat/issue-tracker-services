import {
  WORKSPACE_MEMBER_ROLES,
  WORKSPACE_MEMBER_STATUS,
  WorkspaceMemberRoles,
  WorkspaceMemberStatus,
} from "@issue-tracker/common";
import { Audit } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Workspace } from "./Workspace";

@Entity({ name: "workspace_members" })
export class WorkspaceMember extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id", type: "uuid", nullable: true })
  userId?: string;

  @ManyToOne(() => Workspace)
  @Column({ name: "workspace_id", type: "uuid" })
  @JoinColumn({ name: "workspace_id" })
  workspaceId!: string;

  @Column({ type: "text" })
  email!: string;

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
