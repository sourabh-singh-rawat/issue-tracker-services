import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Space } from "./Space";
import { Status } from "./Status";

@Entity({ name: "status_groups" })
export class StatusGroup extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "space_id", type: "uuid" })
  spaceId!: string;

  @ManyToOne(() => Space, (x) => x.statuses)
  @JoinColumn({ name: "space_id" })
  space!: Space;

  @OneToMany(() => Status, (x) => x.group)
  statuses!: Status;
}
