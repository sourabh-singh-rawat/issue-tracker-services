import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { AuditEntity } from "@issue-tracker/orm";

@Entity("access_tokens")
export class AccessTokenEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "access_tokens_pkey",
  })
  id!: string;

  @ManyToOne(() => UserEntity)
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
