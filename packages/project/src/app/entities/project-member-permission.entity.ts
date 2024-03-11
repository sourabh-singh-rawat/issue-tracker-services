import { Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CasbinRule } from "typeorm-adapter";

@Entity({ name: "project_member_permissions" })
export class ProjectMemberPermissions extends CasbinRule {
  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdDate!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedDate?: Date;
}
