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
  WORKSPACE_MEMBER_INVITE_STATUS,
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
    default: WORKSPACE_MEMBER_INVITE_STATUS.PENDING,
    enum: [
      WORKSPACE_MEMBER_INVITE_STATUS.ACCEPTED,
      WORKSPACE_MEMBER_INVITE_STATUS.DECLINED,
      WORKSPACE_MEMBER_INVITE_STATUS.ERROR,
      WORKSPACE_MEMBER_INVITE_STATUS.EXPIRED,
      WORKSPACE_MEMBER_INVITE_STATUS.PENDING,
      WORKSPACE_MEMBER_INVITE_STATUS.REVOKED,
    ],
  })
  status!: WorkspaceMemberStatus;
}
