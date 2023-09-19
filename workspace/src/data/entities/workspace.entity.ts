import { AuditEntity } from "@sourabhrawatcc/core-utils";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

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
  @Column("uuid")
  @JoinColumn({
    name: "owner_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "workspaces_fkey",
  })
  ownerUserId!: string;
}
