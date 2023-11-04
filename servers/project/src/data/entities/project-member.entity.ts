import {
  AuditEntity,
  ProjectInviteStatus,
  ProjectRoles,
} from "@sourabhrawatcc/core-utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "project_members" })
export class ProjectMemberEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "creator_id", type: "uuid" })
  creatorId!: string;

  @Column({ type: "text" })
  role!: ProjectRoles;

  @Column({
    name: "invite_status",
    type: "text",
    default: ProjectInviteStatus.PENDING,
  })
  inviteStatus!: ProjectInviteStatus;
}
