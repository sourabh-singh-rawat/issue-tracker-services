import { Repository } from "@issue-tracker/orm";
import { Workspace } from "../../entities/Workspace";

export interface WorkspaceRepository extends Repository<Workspace> {
  find(userId: string): Promise<Workspace[]>;
  findByUserId(userId: string): Promise<Workspace[]>;
  findById(id: string): Promise<Workspace | null>;
}
