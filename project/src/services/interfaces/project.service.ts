import { ProjectRegistrationData } from "@sourabhrawatcc/core-utils";

export interface ProjectService {
  createProject(
    userId: string,
    workspaceId: string,
    projectRegistrationData: ProjectRegistrationData,
  ): Promise<void>;
}
