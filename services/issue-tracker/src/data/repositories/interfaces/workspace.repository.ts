import { Repository } from "@issue-tracker/orm";
import { WorkspaceEntity } from "../../entities/workspace.entity";

export interface WorkspaceRepository extends Repository<WorkspaceEntity> {
  find(userId: string): Promise<WorkspaceEntity[]>;
  findByUserId(userId: string): Promise<WorkspaceEntity[]>;
  findById(id: string): Promise<WorkspaceEntity | null>;
}
