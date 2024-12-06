import { AuditEntity } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("access_tokens")
export class AccessToken extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "access_tokens_pkey",
  })
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "access_tokens_fkey",
  })
  userId!: string;

  @Column({ name: "token_value", type: "text" })
  tokenValue!: string;

  @Column({ name: "expiration_at", type: "timestamp with time zone" })
  expirationAt!: Date;
}
