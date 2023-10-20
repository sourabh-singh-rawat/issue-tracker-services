import { AuditEntity } from "@sourabhrawatcc/core-utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "sent_emails" })
export class SentEmailEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "sent_emails_pkey",
  })
  id!: string;

  @Column({ name: "receiver_email", type: "text" })
  receiverEmail!: string;
}
