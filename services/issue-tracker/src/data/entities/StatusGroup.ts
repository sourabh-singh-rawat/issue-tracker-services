import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { List } from "./List";
import { StatusOption } from "./Status";

@Entity({ name: "status_option_groups" })
export class StatusOptionGroup extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "list_id", type: "uuid" })
  listId!: string;

  @ManyToOne(() => List, (x) => x.statuses)
  @JoinColumn({ name: "list_id" })
  list!: List;

  @OneToMany(() => StatusOption, (x) => x.group)
  statuses!: StatusOption;
}
