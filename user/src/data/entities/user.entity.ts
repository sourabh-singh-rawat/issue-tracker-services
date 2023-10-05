import { AuditEntity } from "@sourabhrawatcc/core-utils";
import {
  Check,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "users_pkey",
  })
  id!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text", name: "password_hash" })
  passwordHash!: string;

  @Column({ type: "text", name: "password_salt" })
  passwordSalt!: string;

  @Generated("uuid")
  @Column({ name: "default_workspace_id", type: "uuid" })
  defaultWorkspaceId!: string;

  @Column({ name: "default_workspace_name", type: "text" })
  defaultWorkspaceName!: string;

  @Column({
    name: "is_email_verified",
    type: "boolean",
    default: false,
  })
  isEmailVerified!: boolean;
}
