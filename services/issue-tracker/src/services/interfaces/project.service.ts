import {
  Filters,
  ProjectDetails,
  ProjectFormData,
  ProjectRoles,
  ServiceResponse,
} from "@issue-tracker/common";
import { ProjectStatus } from "@issue-tracker/common/dist/constants/enums/project-status";
import { List, WorkspaceMember } from "../../data/entities";

export interface ProjectService {
  createProject(
    userId: string,
    formData: ProjectFormData,
  ): Promise<ServiceResponse<string>>;
  createProjectInvite(
    userId: string,
    projectId: string,
    role: ProjectRoles,
    invitedBy: string,
    workspaceId: string,
  ): Promise<void>;
  createProjectMember(
    userId: string,
    projectId: string,
    role: ProjectRoles,
    invitedBy: string,
    workspaceId: string,
  ): Promise<void>;
  confirmProjectInvite(token: string): Promise<ServiceResponse<string>>;
  getProjectStatusList(): ServiceResponse<ProjectStatus[]>;
  getProjectRoleList(): ServiceResponse<ProjectRoles[]>;
  getProject: (id: string) => Promise<List>;
  getWorkspaceMemberList(
    userId: string,
    projectId: string,
  ): Promise<ServiceResponse<WorkspaceMember[]>>;
  updateProject(id: string, updatables: ProjectFormData): Promise<void>;
}
