import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";
import { AuditEntity } from "@issue-tracker/orm";

@Entity({ name: "item_assignees" })
export class ItemAssignee extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @JoinColumn({ name: "item_id" })
  itemId!: string;

  @ManyToOne(() => Item, ({ assignees }) => assignees)
  issue!: Item;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user!: User;
}
