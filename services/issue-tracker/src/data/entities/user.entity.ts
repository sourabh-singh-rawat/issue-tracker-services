import { AuditEntity } from "@issue-tracker/orm";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkspaceMemberEntity } from "./workspace-member.entity";
import {
  USER_EMAIL_CONFIRMATION_STATUS,
  UserEmailConfirmationStatus,
} from "@issue-tracker/common";

@Entity({ name: "users" })
export class UserEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "users_pkey",
  })
  id!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ name: "default_workspace_id", type: "uuid", nullable: true })
  defaultWorkspaceId!: string;

  @Column({
    name: "email_confirmation_status",
    type: "enum",
    default: USER_EMAIL_CONFIRMATION_STATUS.PENDING,
    enum: [
      USER_EMAIL_CONFIRMATION_STATUS.PENDING,
      USER_EMAIL_CONFIRMATION_STATUS.SENT,
      USER_EMAIL_CONFIRMATION_STATUS.ACCEPTED,
      USER_EMAIL_CONFIRMATION_STATUS.EXPIRED,
      USER_EMAIL_CONFIRMATION_STATUS.REVOKED,
    ],
  })
  emailConfirmationStatus!: UserEmailConfirmationStatus;

  @Column({ name: "display_name", type: "text" })
  displayName!: string;

  @Column({ name: "photo_url", type: "text", nullable: true })
  photoUrl?: string;

  @OneToMany(() => WorkspaceMemberEntity, ({ user }) => user)
  memberWorkspaces?: WorkspaceMemberEntity[];
}
