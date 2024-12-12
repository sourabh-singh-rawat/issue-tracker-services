import { Audit } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "view_fields" })
export class ViewField extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "view_id", type: "uuid" })
  viewId!: string;

  @Column({ name: "field_id", type: "uuid" })
  fieldId!: string;
}
