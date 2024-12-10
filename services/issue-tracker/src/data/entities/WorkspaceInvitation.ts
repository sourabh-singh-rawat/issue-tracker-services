import {
  EMAIL_VERIFICATION_TOKEN_STATUS,
  EmailVerificationTokenStatus,
} from "@issue-tracker/common";
import { Audit } from "@issue-tracker/orm";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "workspace_invitations" })
export class WorkspaceInvitation extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "token", type: "text" })
  token!: string;

  @Column({ name: "expires_at", type: "timestamptz" })
  expiresAt!: Date;

  @Column({
    name: "status",
    type: "enum",
    enum: [
      EMAIL_VERIFICATION_TOKEN_STATUS.VALID,
      EMAIL_VERIFICATION_TOKEN_STATUS.REVOKED,
      EMAIL_VERIFICATION_TOKEN_STATUS.EXPIRED,
      EMAIL_VERIFICATION_TOKEN_STATUS.USED,
    ],
  })
  status!: EmailVerificationTokenStatus;

  @CreateDateColumn({ name: "sent_at", type: "timestamptz" })
  createdAt!: Date;
}
