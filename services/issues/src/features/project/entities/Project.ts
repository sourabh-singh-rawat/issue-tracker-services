import { Audit } from "@pine/orm";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Issue } from "@/features/issue/entities/Issue";
import { StatusOption } from "@/features/status/entities/Status";
import { Workspace } from "@/features/workspace/entities/Workspace";

@Entity({ name: "lists" })
export class Project extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @Column({ name: "workspace_id", type: "uuid" })
  workspaceId!: string;

  @OneToMany(() => Issue, (x) => x.project)
  issues!: Issue[];

  @ManyToOne(() => Workspace, (x) => x.projects)
  @JoinColumn({ name: "workspace_id" })
  workspace!: Workspace;

  @OneToMany(() => StatusOption, (x) => x.project)
  statuses!: StatusOption[];
}
