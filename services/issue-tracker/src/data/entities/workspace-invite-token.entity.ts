import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "@issue-tracker/orm";
import {
  EMAIL_VERIFICATION_TOKEN_STATUS,
  EmailVerificationTokenStatus,
} from "@issue-tracker/common";

@Entity({ name: "workspace_invite_tokens" })
export class WorkspaceInviteTokenEntity extends AuditEntity {
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

  @Column({ name: "sent_at", type: "timestamptz" })
  sentAt!: Date;
}
