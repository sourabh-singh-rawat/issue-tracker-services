import { Audit } from "@pine/orm";
import { Entity, OneToMany } from "typeorm";
import { Workspace } from "@/entities/Workspace";

@Entity({ name: "users" })
export class User extends Audit {
  @OneToMany(() => Workspace, (w) => w.createdBy)
  workspaces!: Workspace[];
}
