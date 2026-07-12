import { ItemPriority } from "@issue-tracker/common";
import { Audit } from "@issue-tracker/orm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { Project } from "@/features/project/entities/Project";
import { User } from "@/features/user/entities/User";
import { IssueAssignee } from "./IssueAssignee";

@Tree("closure-table", {
  closureTableName: "items",
  ancestorColumnName: (column) => "ancestor_" + column.propertyName,
  descendantColumnName: (column) => "descendant_" + column.propertyName,
})
@Entity({ name: "items" })
export class Issue extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text" })
  type!: string;

  @Column({ name: "status_id", type: "uuid" })
  statusId!: string;

  @Column({ name: "priority", type: "text" })
  priority!: ItemPriority;

  @Column({ name: "list_id", type: "uuid" })
  projectId!: string;

  @Column({
    name: "start_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  startDate?: Date;

  @Column({
    name: "due_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  dueDate?: Date;

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by_id" })
  createdBy!: User;

  @Column({ name: "updated_by_id", type: "uuid", nullable: true })
  updatedById?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "updated_by_id" })
  updatedBy?: User;

  @OneToMany(() => IssueAssignee, ({ issue }) => issue)
  assignees!: IssueAssignee;

  @TreeChildren()
  subIssues!: Issue[];

  @TreeParent()
  @JoinColumn({ name: "parent_item_id" })
  parentIssue!: Issue;

  @ManyToOne(() => Project, (x) => x.issues)
  @JoinColumn({ name: "list_id" })
  project!: Project;

  @Column({ name: "estimate", type: "integer", nullable: true })
  estimate?: number;

  @Column({ name: "component", type: "text", nullable: true })
  component?: string;
}
