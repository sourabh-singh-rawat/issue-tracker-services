import { Audit } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { View } from "./View";

@Entity({ name: "view_custom_fields" })
export class ViewCustomField extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "view_id", type: "uuid" })
  viewId!: string;

  @ManyToOne(() => View, (x) => x.viewCustomFields)
  @JoinColumn({ name: "view_id" })
  view!: View;

  @Column({ name: "field_id", type: "uuid" })
  fieldId!: string;
}
