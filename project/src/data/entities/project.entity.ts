import { AuditEntity } from "@sourabhrawatcc/core-utils";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "projects" })
export class ProjectEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  description?: string;

  @Column({ type: "text" })
  status!: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: "owner_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "project_owner_fkey",
  })
  @Column({ name: "owner_user_id", type: "uuid" })
  ownerUserId!: string;

  @Column({ name: "workspace_id", type: "uuid" })
  workspaceId!: string;

  @Column({
    name: "start_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  startDate?: Date;

  @Column({
    name: "end_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  endDate?: Date;
}
