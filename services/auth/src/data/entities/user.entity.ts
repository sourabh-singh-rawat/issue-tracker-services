import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserProfileEntity } from "./user-profile.entity";
import { AuditEntity } from "@issue-tracker/orm";
import {
  USER_EMAIL_CONFIRMATION_STATUS,
  UserEmailConfirmationStatus,
} from "@issue-tracker/common";

@Entity({ name: "users" })
export class UserEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text", name: "password_hash" })
  passwordHash!: string;

  @Column({ type: "text", name: "password_salt" })
  passwordSalt!: string;

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

  @OneToOne(() => UserProfileEntity, ({ user }) => user)
  profile!: UserProfileEntity;
}
