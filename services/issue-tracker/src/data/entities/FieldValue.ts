import { Audit } from "@issue-tracker/orm";
import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "field_values" })
export class FieldValue extends Audit {
  @PrimaryColumn("uuid")
  id!: string;
}
