import { WORKSPACE_STATUS, WorkspaceStatus } from "@pine/common";
import { Audit } from "@pine/orm";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Project } from "@/entities/Project";
import { User } from "@/entities/User";

@Entity({ name: "workspaces" })
export class Workspace extends Audit {
  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "created_by_id", type: "uuid" })
  createdById!: string;

  @ManyToOne(() => User, (u) => u.workspaces)
  @JoinColumn({ name: "created_by_id" })
  createdBy!: User;

  @Column({
    name: "status",
    type: "enum",
    default: WORKSPACE_STATUS.ACTIVE,
    enum: [
      WORKSPACE_STATUS.ACTIVE,
      WORKSPACE_STATUS.ARCHIVED,
      WORKSPACE_STATUS.DEFAULT,
      WORKSPACE_STATUS.PENDING,
      WORKSPACE_STATUS.TEMPLATE,
    ],
  })
  status!: WorkspaceStatus;

  @OneToMany(() => Project, (u) => u.workspace)
  projects!: Project;
}
