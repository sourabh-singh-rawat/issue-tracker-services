import {
  EMAIL_STATUS,
  EMAIL_TYPE,
  EmailStatus,
  EmailType,
} from "@issue-tracker/common";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "emails" })
export class EmailEntity extends BaseEntity {
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

  @Column({ name: "sender_id", type: "uuid" })
  senderId!: string;

  @Column({ name: "receiver_email", type: "text" })
  receiverEmail!: string;

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
  message!: string;

  @Column({ name: "token", type: "text", nullable: true })
  token?: string;
}
