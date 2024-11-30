import { AuditEntity } from "@issue-tracker/orm";
import {
  Column,
  CreateDateColumn,
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

@Entity({ name: "verification_links" })
export class VerificationLink extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @ManyToOne(() => User, (x) => x.emailVerificationTokens)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "token", type: "text" })
  token!: string;

  @Column({ name: "token_id", type: "uuid" })
  tokenId!: string;

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

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;
}
