import { Audit } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("user_profiles")
export class UserProfile extends Audit {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "user_profiles_pkey",
  })
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @OneToOne(() => User, ({ profile }) => profile)
  @JoinColumn({
    name: "user_id",
    foreignKeyConstraintName: "user_profiles_fkey",
    referencedColumnName: "id",
  })
  user!: User;

  @Column({ name: "display_name", type: "text" })
  displayName!: string;

  @Column({ name: "description", type: "text", nullable: true })
  description?: string;

  @Column({ name: "photo_url", type: "text", nullable: true })
  photoUrl?: string;
}
