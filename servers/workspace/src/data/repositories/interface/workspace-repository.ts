import { Repository } from "@sourabhrawatcc/core-utils";
import { WorkspaceEntity } from "../../entities";

export interface WorkspaceRepository extends Repository<WorkspaceEntity> {
  findById(id: string): Promise<WorkspaceEntity>;
  find(userId: string): Promise<WorkspaceEntity[]>;
}
