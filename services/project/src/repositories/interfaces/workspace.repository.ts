import { Repository } from "@issue-tracker/orm";
import { WorkspaceEntity } from "../../app/entities";

export interface WorkspaceRepository extends Repository<WorkspaceEntity> {}
