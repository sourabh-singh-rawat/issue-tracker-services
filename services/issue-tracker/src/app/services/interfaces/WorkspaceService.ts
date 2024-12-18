import { ServiceResponse, WorkspaceMemberRoles } from "@issue-tracker/common";
import { ServiceOptions } from "@issue-tracker/orm";
import { User, Workspace } from "../../../data";

export interface CreateWorkspaceOptions extends ServiceOptions {
  userId: string;
  name: string;
  id?: string;
  description?: string;
}

export interface CreateDefaultWorkspaceOptions extends ServiceOptions {
  user: User;
}

export interface WorkspaceService {
  createWorkspace(options: CreateWorkspaceOptions): Promise<string>;
  createDefaultWorkspace(options: CreateDefaultWorkspaceOptions): Promise<void>;
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
  findWorkspaces(userId: string): Promise<Workspace[]>;
  findDefaultWorkspace(userId: string): Promise<Workspace>;
  getWorkspace(id: string): Promise<ServiceResponse<Workspace>>;
  getWorkspaceRoleList(): Promise<ServiceResponse<WorkspaceMemberRoles[]>>;
  updateWorkspace(
    id: string,
    updateables: { name?: string },
  ): Promise<ServiceResponse<string>>;
}
