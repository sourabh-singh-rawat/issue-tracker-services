import {
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Entity,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { AuditEntity } from "./audit.entity";

@Entity("user_profiles")
export class UserProfileEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "user_profiles_pkey",
  })
  id!: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "user_profiles_fkey",
  })
  userId!: string;

  @Column({ name: "display_name", type: "text" })
  displayName!: string;

  @Column({ name: "description", type: "text", nullable: true })
  description?: string;

  @Column({ name: "photo_url", type: "text", nullable: true })
  photoUrl?: string;

  @Column({ name: "default_workspace_id", type: "uuid", nullable: true })
  defaultWorkspaceId?: string;
}
