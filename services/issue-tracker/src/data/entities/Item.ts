import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { User } from "./User";
import { List } from "./List";
import { ItemAssignee } from "./ItemAssignee";
import { AuditEntity } from "@issue-tracker/orm";

@Tree("closure-table", {
  closureTableName: "items",
  ancestorColumnName: (column) => "ancestor_" + column.propertyName,
  descendantColumnName: (column) => "descendant_" + column.propertyName,
})
@Entity({ name: "items" })
export class Item extends AuditEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text" })
  type!: string;

  @Column({ type: "text" })
  status!: string;

  @Column({ type: "text" })
  priority!: string;

  @Column({ name: "list_id", type: "uuid" })
  listId!: string;

  @Column({
    name: "start_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  startDate?: Date;

  @Column({
    name: "due_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  dueDate?: Date;

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by_id" })
  createdBy!: User;

  @Column({ name: "updated_by_id", type: "uuid", nullable: true })
  updatedById?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "updated_by_id" })
  updatedBy?: User;

  @OneToMany(() => ItemAssignee, ({ issue }) => issue)
  assignees!: ItemAssignee;

  @TreeChildren()
  subItems!: Item[];

  @TreeParent()
  parentItem!: Item;

  @ManyToOne(() => List, (x) => x.items)
  @JoinColumn({ name: "list_id" })
  list!: List;
}