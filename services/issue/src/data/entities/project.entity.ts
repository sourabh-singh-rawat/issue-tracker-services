import { AuditEntity } from "@issue-tracker/orm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "projects" })
export class ProjectEntity extends AuditEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "projects_pkey" })
  id!: string;

  @Column({ type: "text" })
  name!: string;
}
