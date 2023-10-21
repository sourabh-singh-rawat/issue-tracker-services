import {
  ServiceResponse,
  WorkspaceRoles,
  WorkspaceRegistrationData,
} from "@sourabhrawatcc/core-utils";
import { UserEntity, WorkspaceEntity } from "../../data/entities";

export interface WorkspaceService {
  createWorkspace(
    userId: string,
    workspace: WorkspaceRegistrationData,
  ): Promise<ServiceResponse<string>>;
  createDefaultWorkspace(user: UserEntity): Promise<void>;
  createWorkspaceMember(
    userId: string,
    workspaceId: string,
    role: WorkspaceRoles,
  ): Promise<void>;
  createWorkspaceInvite(
    userId: string,
    email: string,
    role: WorkspaceRoles,
  ): Promise<void>;
  confirmWorkspaceInvite(token: string): Promise<ServiceResponse<string>>;
  getAllWorkspaces(userId: string): Promise<ServiceResponse<WorkspaceEntity[]>>;
  getWorkspace(id: string): Promise<ServiceResponse<WorkspaceEntity>>;
  getWorkspaceRoleList(): Promise<ServiceResponse<WorkspaceRoles[]>>;
}
