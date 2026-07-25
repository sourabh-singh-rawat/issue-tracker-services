import { Audit } from "@pine/orm";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Issue } from "@/entities/Issue";
import { User } from "@/entities/User";

@Entity({ name: "item_assignees" })
export class IssueAssignee extends Audit {
  @JoinColumn({ name: "item_id" })
  issueId!: string;

  @ManyToOne(() => Issue, ({ assignees }) => assignees)
  issue!: Issue;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user!: User;
}
