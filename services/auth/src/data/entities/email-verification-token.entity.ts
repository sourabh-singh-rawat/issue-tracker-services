import { AuditEntity } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  EMAIL_VERIFICATION_TOKEN_STATUS,
  EmailVerificationTokenStatus,
} from "@issue-tracker/common";
import { User } from "./User";

@Entity({ name: "email_verification_tokens" })
export class EmailVerificationTokenEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(
    () => User,
    ({ emailVerificationTokens }) => emailVerificationTokens,
  )
  user!: User;

  @Column({ name: "token", type: "text" })
  token!: string;

  @Column({ name: "expires_at", type: "timestamp with time zone" })
  expiresAt!: Date;

  @Column({
    name: "status",
    type: "enum",
    default: EMAIL_VERIFICATION_TOKEN_STATUS.VALID,
    enum: [
      EMAIL_VERIFICATION_TOKEN_STATUS.VALID,
      EMAIL_VERIFICATION_TOKEN_STATUS.REVOKED,
      EMAIL_VERIFICATION_TOKEN_STATUS.EXPIRED,
      EMAIL_VERIFICATION_TOKEN_STATUS.USED,
    ],
  })
  status!: EmailVerificationTokenStatus;

  @Column({ name: "sent_at", type: "timestamp with time zone", nullable: true })
  sentAt?: Date;
}
