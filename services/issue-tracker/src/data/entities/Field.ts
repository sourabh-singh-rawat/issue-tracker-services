import { FIELD_TYPE, FieldType } from "@issue-tracker/common";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "fields" })
export class Field extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: [
      FIELD_TYPE._STATUS,
      FIELD_TYPE._PRIORITY,
      FIELD_TYPE.CHECKBOX,
      FIELD_TYPE.DATE,
      FIELD_TYPE.EMAIL,
      FIELD_TYPE.NUMBER,
      FIELD_TYPE.SINGLE_LINE,
      FIELD_TYPE.MULTI_LINE,
      FIELD_TYPE.LOOKUP,
      FIELD_TYPE.MULTI_LOOKUP,
      FIELD_TYPE.PICKLIST,
      FIELD_TYPE.MULTI_PICKLIST,
      FIELD_TYPE.FILES,
    ],
  })
  type!: FieldType;

  @Column({ name: "list_id", type: "uuid", nullable: true })
  listId?: string;

  @Column({ name: "is_system_field", type: "boolean", default: false })
  isSystemField!: string;

  @Column({ name: "value", type: "text", nullable: true })
  value?: string | string[] | null;
}
