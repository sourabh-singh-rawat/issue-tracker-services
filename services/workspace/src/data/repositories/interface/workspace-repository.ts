import { Repository } from "@issue-tracker/orm";
import { WorkspaceEntity } from "../../entities";

export interface WorkspaceRepository extends Repository<WorkspaceEntity> {
  findById(id: string): Promise<WorkspaceEntity | null>;
  find(userId: string): Promise<WorkspaceEntity[]>;
}
