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
}
