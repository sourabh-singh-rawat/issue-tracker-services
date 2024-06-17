import {
  Filters,
  ProjectDetails,
  ProjectFormData,
  ProjectRoles,
  ServiceResponse,
} from "@issue-tracker/common";
import { ProjectStatus } from "@issue-tracker/common/dist/constants/enums/project-status";
import {
  ProjectEntity,
  ProjectMemberEntity,
  WorkspaceMemberEntity,
} from "../../data/entities";

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
  getAllProjects(
    userId: string,
    filters: Filters,
  ): Promise<ServiceResponse<ProjectDetails<ProjectMemberEntity>[]>>;
  getProject: (id: string) => Promise<ProjectEntity>;
  getProjectMembers(
    projectId: string,
  ): Promise<ServiceResponse<ProjectMemberEntity[]>>;
  getWorkspaceMemberList(
    userId: string,
    projectId: string,
  ): Promise<ServiceResponse<WorkspaceMemberEntity[]>>;
  updateProject(id: string, updatables: ProjectFormData): Promise<void>;
}
