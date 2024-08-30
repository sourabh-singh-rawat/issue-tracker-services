import { AuditEntity } from "@issue-tracker/orm";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkspaceMemberEntity } from "./workspace-member.entity";
import {
  EMAIL_VERIFICATION_STATUS,
  EmailVerificationStatus,
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
    name: "email_verification_status",
    type: "enum",
    default: EMAIL_VERIFICATION_STATUS.UNVERIFIED,
    enum: [
      EMAIL_VERIFICATION_STATUS.UNVERIFIED,
      EMAIL_VERIFICATION_STATUS.VERIFIED,
      EMAIL_VERIFICATION_STATUS.FAILED,
    ],
  })
  emailVerificationStatus!: EmailVerificationStatus;

  @Column({ name: "display_name", type: "text" })
  displayName!: string;

  @Column({ name: "photo_url", type: "text", nullable: true })
  photoUrl?: string;

  @OneToMany(() => WorkspaceMemberEntity, ({ user }) => user)
  memberWorkspaces?: WorkspaceMemberEntity[];
}
