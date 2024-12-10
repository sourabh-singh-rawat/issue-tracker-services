import { WORKSPACE_STATUS, WorkspaceStatus } from "@issue-tracker/common";
import { Audit } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { List } from "./List";
import { Space } from "./Space";
import { User } from "./User";

@Entity({ name: "workspaces" })
export class Workspace extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @ManyToOne(() => User, (u) => u.workspaces)
  @JoinColumn({ name: "created_by_id" })
  createdBy!: User;

  @Column({
    name: "status",
    default: WORKSPACE_STATUS.ACTIVE,
    enum: [
      WORKSPACE_STATUS.ACTIVE,
      WORKSPACE_STATUS.ARCHIVED,
      WORKSPACE_STATUS.DEFAULT,
      WORKSPACE_STATUS.PENDING,
      WORKSPACE_STATUS.TEMPLATE,
    ],
  })
  status!: WorkspaceStatus;

  @OneToMany(() => Space, (u) => u.workspace)
  spaces!: Space;

  @OneToMany(() => List, (u) => u.workspace)
  lists!: List;
}
