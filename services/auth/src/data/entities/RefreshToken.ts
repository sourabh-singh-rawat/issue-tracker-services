import { Audit } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("refresh_tokens")
export class RefreshToken extends Audit {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "refresh_tokens_pkey",
  })
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "refresh_token_fkey",
  })
  userId!: string;

  @Column({ name: "token_value", type: "text" })
  tokenValue!: string;

  @Column({ name: "expiration_at", type: "timestamp with time zone" })
  expirationAt!: Date;
}
