import {
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Entity,
} from "typeorm";
import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "./user.entity";

@Entity("user_profiles")
export class UserProfileEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "user_profiles_pkey",
  })
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @OneToOne(() => UserEntity, ({ profile }) => profile)
  @JoinColumn({
    name: "user_id",
    foreignKeyConstraintName: "user_profiles_fkey",
    referencedColumnName: "id",
  })
  user!: UserEntity;

  @Column({ name: "display_name", type: "text" })
  displayName!: string;

  @Column({ name: "description", type: "text", nullable: true })
  description?: string;

  @Column({ name: "photo_url", type: "text", nullable: true })
  photoUrl?: string;

  @Column({ name: "default_workspace_id", type: "uuid", nullable: true })
  defaultWorkspaceId?: string;
}
