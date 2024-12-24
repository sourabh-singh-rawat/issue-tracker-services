import { FIELD_TYPE } from "@issue-tracker/common";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { View } from "./View";

@Entity({ name: "view_system_fields" })
export class ViewSystemField extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "view_id", type: "uuid" })
  viewId!: string;

  @ManyToOne(() => View, (x) => x.viewSystemFields)
  @JoinColumn({ name: "view_id" })
  view!: View;

  @Column({
    name: "name",
    type: "enum",
    enum: [FIELD_TYPE._STATUS, FIELD_TYPE._PRIORITY],
  })
  name!: string;

  @Column({ name: "is_hidden", type: "boolean", default: false })
  isHidden!: boolean;
}
