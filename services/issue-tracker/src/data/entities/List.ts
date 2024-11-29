import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { AuditEntity } from "@issue-tracker/orm";
import { Item } from "./Item";

@Entity({ name: "lists" })
export class List extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  description?: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "owner_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "project_owner_fkey",
  })
  @Column({ name: "ownerId", type: "uuid" })
  ownerId!: string;

  @Column({ name: "workspace_id", type: "uuid" })
  workspaceId!: string;

  @OneToMany(() => Item, (x) => x.list)
  items!: Item[];
}
