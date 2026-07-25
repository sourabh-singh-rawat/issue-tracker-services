import { Audit } from "@pine/orm";
import { Column, Entity } from "typeorm";

@Entity({ name: "issue_comments" })
export class IssueComment extends Audit {
  @Column({ name: "description", type: "text" })
  description!: string;

  @Column({ name: "issue_id", type: "uuid" })
  issueId!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;
}
