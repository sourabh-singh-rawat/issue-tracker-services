import { FIELD_TYPE, FieldType } from "@issue-tracker/common";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity({ name: "custom_fields" })
@Unique(["name"])
export class CustomField extends BaseEntity {
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
}
