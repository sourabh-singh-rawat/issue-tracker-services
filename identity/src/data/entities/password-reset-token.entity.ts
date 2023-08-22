import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AuditEntity } from "./audit.entity";
import { UserEntity } from "./user.entity";

@Entity("password_reset_tokens")
export class PasswordResetToken extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "password_reset_tokens_pkey",
  })
  id!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "password_reset_tokens_fkey",
  })
  userId!: string;

  @Column({
    name: "token_value",
    type: "text",
  })
  tokenValue!: string;

  @Column({
    name: "status",
    type: "text", // todo enum
  })
  status!: string;

  @Column({ name: "expiration_at", type: "timestamp with time zone" })
  expirationAt!: Date;
}
