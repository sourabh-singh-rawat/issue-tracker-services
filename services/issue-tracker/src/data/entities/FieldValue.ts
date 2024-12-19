import { Audit } from "@issue-tracker/orm";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Item } from "./Item";

@Entity({ name: "field_values" })
export class FieldValue extends Audit {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "field_id", type: "uuid" })
  fieldId!: string;

  @Column({ name: "item_id", type: "uuid" })
  itemId!: string;

  @ManyToOne(() => Item, (x) => x.fieldValues)
  @JoinColumn({ name: "item_id" })
  item!: Item;

  @Column({ name: "value", type: "text", nullable: true })
  value?: string | string[] | null;
}
