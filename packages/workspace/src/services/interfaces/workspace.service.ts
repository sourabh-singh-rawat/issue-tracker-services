import {
  ServiceResponse,
  WorkspaceRoles,
  WorkspaceRegistrationData,
} from "@sourabhrawatcc/core-utils";
import { UserEntity, WorkspaceEntity } from "../../app/entities";
import { WorkspaceMemberEntity } from "../../app/entities/workspace-member.entity";

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
  getWorkspace(id: string): Promise<ServiceResponse<WorkspaceEntity | null>>;
  getWorkspaceRoleList(): Promise<ServiceResponse<WorkspaceRoles[]>>;
  getWorkspaceMemberList(
    workspaceId: string,
  ): Promise<ServiceResponse<WorkspaceMemberEntity[]>>;
}
