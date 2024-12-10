import { IssueActivity } from "@issue-tracker/common";
import { Audit } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "issue_activities" })
export class IssueActivityEntity extends Audit {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "issue_activities_pkey",
  })
  id!: string;

  @Column({ type: "text" })
  type!: IssueActivity;

  @Column({ name: "issue_id", type: "uuid" })
  issueId!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "timestamp", type: "timestamp with time zone" })
  timestamp!: Date;
}
