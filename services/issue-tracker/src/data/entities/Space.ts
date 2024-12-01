import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Workspace } from "./Workspace";
import { List } from "./List";

@Entity({ name: "spaces" })
export class Space extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @Column({ name: "workspace_id", type: "uuid" })
  workspaceId!: string;

  @ManyToOne(() => User, (x) => x.spaces)
  @JoinColumn({ name: "created_by_id" })
  createdBy!: User;

  @ManyToOne(() => Workspace, (x) => x.spaces)
  @JoinColumn({ name: "workspace_id" })
  workspace!: Workspace;

  @OneToMany(() => List, (x) => x.space)
  lists!: List[];
}
