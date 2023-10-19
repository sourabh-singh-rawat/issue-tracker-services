import {
  Filters,
  ProjectDetails,
  ProjectFormData,
  ProjectStatus,
  ServiceResponse,
  ProjectMember,
} from "@sourabhrawatcc/core-utils";
import { ProjectEntity, ProjectMemberEntity } from "../../data/entities";

export interface ProjectService {
  createProject(
    userId: string,
    formData: ProjectFormData,
  ): Promise<ServiceResponse<string>>;
  getProjectStatusList(): ServiceResponse<ProjectStatus[]>;
  getProjectList(
    userId: string,
    filters: Filters,
  ): Promise<ServiceResponse<ProjectDetails<ProjectMember>[]>>;
  getProject: (id: string) => Promise<ServiceResponse<ProjectEntity>>;
  getProjectMembers(
    projectId: string,
  ): Promise<ServiceResponse<ProjectMember[]>>;
  updateProject(id: string, updatables: ProjectFormData): Promise<void>;
}
