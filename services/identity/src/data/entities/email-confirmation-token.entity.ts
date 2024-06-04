import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { AuditEntity } from "@issue-tracker/orm";

@Entity("email_confirmation_tokens")
export class EmailConfirmationToken extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "email_confirmation_tokens_pkey",
  })
  id!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "sender_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "email_confirmation_tokens_fkey",
  })
  senderUserId!: string;

  @Column({ name: "token_value", type: "text" })
  tokenValue!: string;

  @Column({ name: "status", type: "text" })
  status!: string; // todo move to enum

  @Column({ name: "expiration_at", type: "timestamp with time zone" })
  expirationAt!: Date;
}
