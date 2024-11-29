import { CUSTOM_FIELD_TYPE, CustomFieldType } from "@issue-tracker/common";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "custom_fields" })
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
      CUSTOM_FIELD_TYPE.CHECKBOX,
      CUSTOM_FIELD_TYPE.DATE,
      CUSTOM_FIELD_TYPE.EMAIL,
      CUSTOM_FIELD_TYPE.NUMBER,
      CUSTOM_FIELD_TYPE.TEXT,
      CUSTOM_FIELD_TYPE.TEXT_AREA,
      CUSTOM_FIELD_TYPE.FILES,
    ],
  })
  type!: CustomFieldType;
}
