import {
  Filters,
  ProjectDetails,
  ProjectFormData,
  ProjectStatus,
  ServiceResponse,
  ProjectMember,
  ProjectRoles,
} from "@sourabhrawatcc/core-utils";
import { ProjectEntity, UserEntity } from "../../data/entities";

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
  ): Promise<void>;
  createProjectMember(
    userId: string,
    projectId: string,
    role: ProjectRoles,
    invitedBy: string,
  ): Promise<void>;
  confirmProjectInvite(token: string): Promise<ServiceResponse<string>>;
  getProjectStatusList(): ServiceResponse<ProjectStatus[]>;
  getProjectRoleList(): ServiceResponse<ProjectRoles[]>;
  getProjectList(
    userId: string,
    filters: Filters,
  ): Promise<ServiceResponse<ProjectDetails<ProjectMember>[]>>;
  getProject: (id: string) => Promise<ServiceResponse<ProjectEntity>>;
  getProjectMembers(
    projectId: string,
  ): Promise<ServiceResponse<ProjectMember[]>>;
  getWorkspaceMemberList(
    workspaceId: string,
  ): Promise<ServiceResponse<UserEntity[]>>;
  updateProject(id: string, updatables: ProjectFormData): Promise<void>;
}
