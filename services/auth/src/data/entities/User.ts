import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserProfile } from "./UserProfile";
import { AuditEntity } from "@issue-tracker/orm";
import {
  EMAIL_VERIFICATION_STATUS,
  EmailVerificationStatus,
} from "@issue-tracker/common";
import { EmailVerificationTokenEntity } from "./email-verification-token.entity";

@Entity({ name: "users" })
export class User extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text", name: "password_hash" })
  passwordHash!: string;

  @Column({ type: "text", name: "password_salt" })
  passwordSalt!: string;

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

  @OneToOne(() => UserProfile, ({ user }) => user)
  profile!: UserProfile;

  @OneToMany(() => EmailVerificationTokenEntity, ({ user }) => user)
  emailVerificationTokens?: EmailVerificationTokenEntity[];
}
