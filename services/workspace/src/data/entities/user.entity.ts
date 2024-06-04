import { AuditEntity } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "users_pkey",
  })
  id!: string;

  @Column({ name: "default_workspace_id", type: "uuid" })
  defaultWorkspaceId!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({
    name: "is_email_verified",
    type: "boolean",
    default: false,
  })
  isEmailVerified!: boolean;

  @Column({ name: "display_name", type: "text" })
  displayName!: string;

  @Column({ name: "photo_url", type: "text", nullable: true })
  photoUrl?: string;
}
