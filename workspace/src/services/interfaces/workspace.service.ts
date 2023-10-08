import {
  ServiceResponse,
  WorkspaceRegistrationData,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceEntity } from "../../data/entities";

export interface WorkspaceService {
  createWorkspace(
    userId: string,
    workspace: WorkspaceRegistrationData,
  ): Promise<ServiceResponse<string>>;
  createDefaultWorkspace(
    userId: string,
    isEmailVerified: boolean,
    workspaceId: string,
  ): Promise<void>;
  getAllWorkspaces(userId: string): Promise<ServiceResponse<WorkspaceEntity[]>>;
  getWorkspace(id: string): Promise<ServiceResponse<WorkspaceEntity>>;
}
