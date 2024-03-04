import { AuditEntity, WorkspaceMemberStatus } from "@sourabhrawatcc/core-utils";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { WorkspaceEntity } from "./workspace.entity";
import { UserEntity } from "./user.entity";

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

  @Column({ type: "text", default: WorkspaceMemberStatus.PENDING })
  status!: WorkspaceMemberStatus;
}
