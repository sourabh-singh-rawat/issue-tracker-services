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
}
