import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "custom_fields" })
export class CustomField extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
}
