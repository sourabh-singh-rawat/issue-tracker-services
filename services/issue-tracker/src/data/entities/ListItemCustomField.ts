import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "list_item_custom_fields" })
export class ListItemCustomField extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
}
