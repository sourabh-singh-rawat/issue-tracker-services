import { AuditEntity } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "emails" })
export class EmailEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "emails_pkey" })
  id!: string;

  @Column({ name: "recipient", type: "text" })
  receiverEmail!: string;
}
