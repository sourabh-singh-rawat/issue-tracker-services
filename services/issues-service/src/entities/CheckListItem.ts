import { Audit } from "@pine/orm";
import { Column, Entity } from "typeorm";

@Entity({ name: "check_list_items" })
export class CheckListItem extends Audit {
  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "issue_id", type: "uuid" })
  issueId!: string;

  @Column({ name: "owner_id", type: "uuid" })
  ownerId!: string;

  @Column({ type: "boolean", default: false })
  completed?: boolean;

  @Column({
    name: "due_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  dueDate?: Date;
}
