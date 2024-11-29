import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "list_custom_fields" })
export class ListCustomField extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "list_id", type: "uuid" })
  listId!: string;

  @Column({ name: "custom_field_id", type: "uuid" })
  customFieldId!: string;
}
