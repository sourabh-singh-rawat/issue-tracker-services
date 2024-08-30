import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { ProjectInviteStatus, ProjectRoles } from "@issue-tracker/common";
import { AuditEntity } from "@issue-tracker/orm";

@Entity({ name: "project_members" })
export class ProjectMemberEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @Column({ name: "user_id", type: "uuid", nullable: true })
  userId!: string;

  @JoinColumn({ name: "user_id", foreignKeyConstraintName: "user_fkey" })
  @ManyToOne(() => UserEntity, { nullable: true })
  user!: UserEntity;

  @Column({ name: "created_by_id", type: "uuid", nullable: true })
  createdById?: string;

  @JoinColumn({
    name: "created_by_id",
    foreignKeyConstraintName: "created_by_fkey",
  })
  @ManyToOne(() => UserEntity)
  createdBy?: UserEntity;

  @Column({ type: "text" })
  role!: ProjectRoles;

  @Column({ name: "workspace_id", type: "uuid" })
  workspaceId!: string;

  @Column({
    name: "invite_status",
    type: "text",
    default: ProjectInviteStatus.PENDING,
  })
  inviteStatus!: ProjectInviteStatus;
}
