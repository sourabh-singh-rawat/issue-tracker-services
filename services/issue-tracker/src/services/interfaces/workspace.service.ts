import {
  ServiceResponse,
  WorkspaceRegistrationData,
  WorkspaceRoles,
} from "@issue-tracker/common";
import { UserEntity } from "../../data/entities";
import { WorkspaceMemberEntity } from "../../data/entities/workspace-member.entity";
import { WorkspaceEntity } from "../../data/entities/workspace.entity";

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
