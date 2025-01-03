import { STATUS_TYPE, StatusType } from "@issue-tracker/common";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StatusOptionGroup } from "./StatusGroup";

@Entity({ name: "status_options" })
export class StatusOption extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({
    type: "enum",
    enum: [
      STATUS_TYPE.NOT_STARTED,
      STATUS_TYPE.ACTIVE,
      STATUS_TYPE.COMPLETED,
      STATUS_TYPE.CLOSED,
    ],
  })
  type!: StatusType;

  @Column({ name: "order_index", type: "integer" })
  orderIndex!: number;

  @Column({ name: "group_id", type: "uuid" })
  groupId!: string;

  @ManyToOne(() => StatusOptionGroup, (x) => x.statuses)
  @JoinColumn({ name: "group_id" })
  group!: StatusOptionGroup;
}
