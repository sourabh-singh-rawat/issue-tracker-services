import {
  Filters,
  ProjectDetails,
  ProjectFormData,
  ProjectStatus,
  ServiceResponse,
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
  ): Promise<ServiceResponse<ProjectDetails<ProjectMemberEntity>[]>>;
  getProject: (id: string) => Promise<ServiceResponse<ProjectEntity>>;
  updateProject(id: string, updatables: ProjectFormData): Promise<void>;
}
