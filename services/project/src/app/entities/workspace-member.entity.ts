import { AuditEntity } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "workspace_members" })
export class WorkspaceMemberEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "workspace_id", type: "uuid" })
  workspaceId!: string;
}
