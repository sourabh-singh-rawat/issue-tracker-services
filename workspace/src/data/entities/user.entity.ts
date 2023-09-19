import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "users_pkey",
  })
  id!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ name: "default_workspace_id", type: "uuid" })
  defaultWorkspaceId!: string;

  @Column({
    name: "is_email_verified",
    type: "boolean",
    default: false,
  })
  isEmailVerified!: boolean;
}
