import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { AuditEntity } from "@issue-tracker/orm";

@Entity({ name: "workspaces" })
export class WorkspaceEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "workspaces_pkey",
  })
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "owner_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "workspaces_fkey",
  })
  @Column({ name: "owner_user_id", type: "uuid", nullable: false })
  ownerUserId!: string;
}
