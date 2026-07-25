import { STATUS_TYPE, StatusType } from "@pine/common";
import { Audit } from "@pine/orm";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Project } from "@/entities/Project";

@Entity({ name: "status_options" })
export class StatusOption extends Audit {
  @Column({ type: "text" })
  name!: string;

  @Column({
    type: "enum",
    enum: [STATUS_TYPE.NOT_STARTED, STATUS_TYPE.ACTIVE, STATUS_TYPE.COMPLETED, STATUS_TYPE.CLOSED],
  })
  type!: StatusType;

  @Column({ name: "order_index", type: "integer" })
  orderIndex!: number;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @ManyToOne(() => Project, (x) => x.statuses)
  @JoinColumn({ name: "project_id" })
  project!: Project;
}
