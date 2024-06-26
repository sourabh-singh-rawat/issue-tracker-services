import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserProfileEntity } from "./user-profile.entity";
import { AuditEntity } from "@issue-tracker/orm";

@Entity({ name: "users" })
export class UserEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "users_pkey",
  })
  id!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text", name: "password_hash" })
  passwordHash!: string;

  @Column({ type: "text", name: "password_salt" })
  passwordSalt!: string;

  @Column({
    name: "is_email_verified",
    type: "boolean",
    default: false,
  })
  isEmailVerified!: boolean;

  @OneToOne(() => UserProfileEntity, ({ user }) => user)
  profile!: UserProfileEntity;
}
