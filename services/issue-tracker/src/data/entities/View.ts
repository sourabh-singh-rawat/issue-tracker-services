import { VIEW_TYPE, ViewType } from "@issue-tracker/common";
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
import { User } from "./User";
import { ViewCustomField } from "./ViewCustomField";
import { ViewSystemField } from "./ViewSystemField";

@Entity({ name: "views" })
export class View extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "list_id", type: "uuid" })
  listId!: string;

  @ManyToOne(() => List, (x) => x.views)
  @JoinColumn({ name: "list_id" })
  list!: List;

  @Column({ name: "name", type: "text" })
  name!: string;

  @Column({
    name: "type",
    type: "enum",
    enum: [VIEW_TYPE.BOARD, VIEW_TYPE.LIST],
  })
  type!: ViewType;

  @Column({ name: "order", type: "int2" })
  order!: number;

  @Column({ name: "is_favorite", type: "boolean", default: false })
  isFavorite?: boolean;

  @Column({ name: "is_pinned", type: "boolean", default: false })
  isPinned?: boolean;

  @Column({ name: "is_autosaved_enabled", type: "boolean", default: true })
  isAutosaveEnabled?: boolean;

  @Column({ name: "is_default_view", type: "boolean", default: false })
  isDefaultView?: boolean;

  @OneToMany(() => ViewCustomField, (x) => x.view)
  viewCustomFields!: ViewCustomField[];

  @OneToMany(() => ViewSystemField, (x) => x.view)
  viewSystemFields!: ViewSystemField[];

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by_id" })
  createdBy!: User;
}
