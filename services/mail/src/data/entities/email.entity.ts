import {
  EMAIL_STATUS,
  EMAIL_TYPE,
  EmailStatus,
  EmailType,
} from "@issue-tracker/common";
import { Audit } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "emails" })
export class Email extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "type",
    type: "enum",
    enum: [
      EMAIL_TYPE.USER_REGISTRATION,
      EMAIL_TYPE.PROJECT_INVITATION,
      EMAIL_TYPE.WORKSPACE_INVITATION,
    ],
  })
  type!: EmailType;

  @Column({ name: "email", type: "text" })
  email!: string;

  @Column({
    name: "status",
    type: "enum",
    enum: [
      EMAIL_STATUS.PENDING,
      EMAIL_STATUS.SENT,
      EMAIL_STATUS.FAILED,
      EMAIL_STATUS.DELIVERED,
      EMAIL_STATUS.OPENED,
      EMAIL_STATUS.CLICKED,
      EMAIL_STATUS.BOUNCED,
      EMAIL_STATUS.SPAM,
    ],
    default: EMAIL_STATUS.PENDING,
  })
  status!: EmailStatus;

  @Column({ name: "message", type: "json" })
  html!: string;
}
