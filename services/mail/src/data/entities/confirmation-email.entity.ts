import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { AuditEntity } from "@issue-tracker/orm";
import {
  CONFIRMATION_EMAIL_STATUS,
  ConfirmationEmailStatus,
} from "@issue-tracker/common";

@Entity({ name: "confirmation_emails" })
export class ConfirmationEmailEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "email", type: "text" })
  emailAddress!: string;

  @Column({ name: "email_verification_token", type: "text" })
  emailVerificationToken!: string;

  @Column({
    name: "status",
    type: "enum",
    default: CONFIRMATION_EMAIL_STATUS.NOT_SENT,
    enum: [
      CONFIRMATION_EMAIL_STATUS.SENT,
      CONFIRMATION_EMAIL_STATUS.NOT_SENT,
      CONFIRMATION_EMAIL_STATUS.DELIVERED,
      CONFIRMATION_EMAIL_STATUS.FAILED,
    ],
    nullable: true,
  })
  status?: ConfirmationEmailStatus;

  @Column({ name: "expires_at", type: "timestamptz" })
  expiresAt!: Date;

  @Column({ name: "confirmed_at", type: "timestamptz", nullable: true })
  confirmedAt?: Date;

  @ManyToOne(() => UserEntity, ({ emailConfirmations }) => emailConfirmations)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}
