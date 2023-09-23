import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { WorkspaceEntity } from "./workspace.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "workspace_member_entity" })
export class WorkspaceMemberEntity extends AuditEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  @PrimaryColumn("uuid")
  id!: string;

  @ManyToOne(() => UserEntity)
  @Column({ name: "user_id", type: "uuid", nullable: false })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  userId!: string;

  @ManyToOne(() => WorkspaceEntity)
  @Column({ name: "workspace_id", type: "uuid", nullable: false })
  @JoinColumn({ name: "workspace_id", referencedColumnName: "id" })
  workspaceId!: string;

  @Column({ name: "role_id", type: "uuid", nullable: true })
  roleId!: string;
}
