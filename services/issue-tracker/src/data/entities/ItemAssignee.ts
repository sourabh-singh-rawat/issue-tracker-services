import { Audit } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./Item";
import { User } from "./User";

@Entity({ name: "item_assignees" })
export class ItemAssignee extends Audit {
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
