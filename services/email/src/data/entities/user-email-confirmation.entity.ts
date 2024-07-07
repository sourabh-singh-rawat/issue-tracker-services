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
  USER_EMAIL_CONFIRMATION_STATUS,
  UserEmailConfirmationStatus,
} from "@issue-tracker/common";

@Entity({ name: "user_email_confirmations" })
export class UserEmailConfirmationEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "email", type: "text" })
  email!: string;

  @Column({ name: "confirmation_token", type: "text" })
  confirmationToken!: string;

  @Column({
    name: "status",
    type: "enum",
    enum: [
      USER_EMAIL_CONFIRMATION_STATUS.PENDING,
      USER_EMAIL_CONFIRMATION_STATUS.SENT,
      USER_EMAIL_CONFIRMATION_STATUS.ACCEPTED,
      USER_EMAIL_CONFIRMATION_STATUS.EXPIRED,
      USER_EMAIL_CONFIRMATION_STATUS.REVOKED,
    ],
  })
  status!: UserEmailConfirmationStatus;

  @Column({ name: "expires_at", type: "timestamptz" })
  expiresAt!: Date;

  @Column({ name: "confirmed_at", type: "timestamptz", nullable: true })
  confirmedAt?: Date;

  @ManyToOne(() => UserEntity, ({ emailConfirmations }) => emailConfirmations)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}
