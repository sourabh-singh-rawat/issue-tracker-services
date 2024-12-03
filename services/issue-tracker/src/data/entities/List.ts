import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AuditEntity } from "@issue-tracker/orm";
import { Item } from "./Item";
import { Workspace } from "./Workspace";
import { Space } from "./Space";

@Entity({ name: "lists" })
export class List extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @Column({ name: "space_id", type: "uuid" })
  spaceId!: string;

  @Column({ name: "workspace_id", type: "uuid" })
  workspaceId!: string;

  @OneToMany(() => Item, (x) => x.list)
  items!: Item[];

  @ManyToOne(() => Workspace, (x) => x.lists)
  @JoinColumn({ name: "workspace_id" })
  workspace!: Workspace;

  @ManyToOne(() => Space, (x) => x.lists)
  @JoinColumn({ name: "space_id" })
  space!: Space;
}
