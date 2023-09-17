import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "users_pkey",
  })
  id!: string;

  @Column({ type: "text", unique: true })
  @Check("users_email_check", "LENGTH(email) BETWEEN 3 AND 80")
  email!: string;

  @Column({
    name: "is_email_verified",
    type: "boolean",
    default: false,
  })
  isEmailVerified!: boolean;
}
