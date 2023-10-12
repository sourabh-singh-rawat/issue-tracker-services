import {
  Filters,
  ProjectDetails,
  ProjectFormData,
  ProjectStatus,
  ServiceResponse,
} from "@sourabhrawatcc/core-utils";

export interface ProjectService {
  createProject(
    userId: string,
    formData: ProjectFormData,
  ): Promise<ServiceResponse<string>>;
  getProjectStatusList(): ServiceResponse<ProjectStatus[]>;
  getProjectList(
    userId: string,
    filters: Filters,
  ): Promise<ServiceResponse<ProjectDetails[]>>;
  updateProject(id: string, updatables: ProjectFormData): Promise<void>;
}
