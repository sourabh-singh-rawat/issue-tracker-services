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
  WORKSPACE_MEMBER_STATUS,
  WorkspaceMemberStatus,
} from "@issue-tracker/common";

@Entity({ name: "workspace_member_invites" })
export class WorkspaceMemberInviteEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "sender_id" })
  senderId!: string;

  @Column({ name: "receiver_email", type: "text" })
  receiverEmail!: string;

  @ManyToOne(() => WorkspaceEntity)
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
}
