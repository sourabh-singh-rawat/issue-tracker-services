import { ITEM_PRIORITY, ItemPriority } from "@issue-tracker/common";
import { AuditEntity } from "@issue-tracker/orm";
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
import { ItemAssignee } from "./ItemAssignee";
import { List } from "./List";
import { Status } from "./Status";
import { User } from "./User";

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

  @Column({ name: "status_id", type: "uuid" })
  statusId!: string;

  @ManyToOne(() => Status, (x) => x.items)
  @JoinColumn({ name: "status_id" })
  status!: Status;

  @Column({
    type: "enum",
    enum: [
      ITEM_PRIORITY.URGENT,
      ITEM_PRIORITY.HIGH,
      ITEM_PRIORITY.NORMAL,
      ITEM_PRIORITY.LOW,
    ],
  })
  priority!: ItemPriority;

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
  @JoinColumn({ name: "parent_item_id" })
  parentItem!: Item;

  @ManyToOne(() => List, (x) => x.items)
  @JoinColumn({ name: "list_id" })
  list!: List;
}
