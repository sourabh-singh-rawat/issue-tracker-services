import { AuditEntity } from "@sourabhrawatcc/core-utils";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { WorkspaceEntity } from "./workspace.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "workspace_members" })
export class WorkspaceMemberEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UserEntity)
  @Column({ name: "user_id", type: "uuid", nullable: false })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  userId!: string;

  @ManyToOne(() => WorkspaceEntity)
  @Column({ name: "workspace_id", type: "uuid", nullable: false })
  @JoinColumn({ name: "workspace_id", referencedColumnName: "id" })
  workspaceId!: string;
}
