import { Repository } from "@issue-tracker/orm";
import { Workspce } from "../../entities/Workspace";

export interface WorkspaceRepository extends Repository<Workspce> {
  find(userId: string): Promise<Workspce[]>;
  findByUserId(userId: string): Promise<Workspce[]>;
  findById(id: string): Promise<Workspce | null>;
}
