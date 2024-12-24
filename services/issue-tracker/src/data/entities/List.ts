import { Audit } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./Item";
import { Space } from "./Space";
import { StatusOptionGroup } from "./StatusGroup";
import { View } from "./View";
import { Workspace } from "./Workspace";

@Entity({ name: "lists" })
export class List extends Audit {
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

  @Column({ name: "selected_view_id", type: "uuid", nullable: true })
  selectedViewId?: string;

  @OneToMany(() => View, (x) => x.list)
  views!: View[];

  @OneToMany(() => StatusOptionGroup, (x) => x.list)
  statuses!: StatusOptionGroup[];
}
