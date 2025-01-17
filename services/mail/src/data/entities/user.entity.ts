import {
  EMAIL_VERIFICATION_STATUS,
  EmailVerificationStatus,
} from "@issue-tracker/common";
import { Audit } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User extends Audit {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "users_pkey" })
  id!: string;

  @Column({ type: "text", unique: true })
  email!: string;

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
}
