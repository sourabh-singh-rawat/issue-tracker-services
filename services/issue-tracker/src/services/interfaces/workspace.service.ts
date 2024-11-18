import {
  ServiceResponse,
  WorkspaceRegistrationData,
  WorkspaceMemberRoles,
} from "@issue-tracker/common";
import { User } from "../../data/entities";
import { WorkspaceMember } from "../../data/entities/WorkspaceMember";
import { Workspce } from "../../data/entities/Workspace";

export interface WorkspaceService {
  createWorkspace(
    userId: string,
    workspace: WorkspaceRegistrationData,
  ): Promise<ServiceResponse<string>>;
  createDefaultWorkspace(user: User): Promise<void>;
  createWorkspaceMember(
    userId: string,
    workspaceId: string,
    role: WorkspaceMemberRoles,
  ): Promise<void>;
  createWorkspaceMember(
    userId: string,
    email: string,
    role: WorkspaceMemberRoles,
  ): Promise<void>;
  confirmWorkspaceInvite(token: string): Promise<ServiceResponse<string>>;
  getAllWorkspaces(userId: string): Promise<ServiceResponse<Workspce[]>>;
  getWorkspace(id: string): Promise<ServiceResponse<Workspce>>;
  getWorkspaceRoleList(): Promise<ServiceResponse<WorkspaceMemberRoles[]>>;
  getWorkspaceMembers(
    workspaceId: string,
  ): Promise<ServiceResponse<WorkspaceMember[]>>;
  updateWorkspace(
    id: string,
    updateables: { name?: string },
  ): Promise<ServiceResponse<string>>;
}
