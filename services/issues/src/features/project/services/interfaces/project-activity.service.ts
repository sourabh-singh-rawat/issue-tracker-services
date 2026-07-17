import { ServiceResponseInputs } from "@pine/common";
import { ProjectPayload } from "@pine/event-bus";
import { ProjectIssueActivity } from "../../entities/ProjectIssueActivity";

export interface ProjectActivityService {
  logCreatedProject(payload: ProjectPayload): Promise<void>;
  logUpdatedProjectName(payload: ProjectPayload): Promise<void>;
  logUpdatedProjectDescription(payload: ProjectPayload): Promise<void>;
  getProjectActivityList(
    id: string,
  ): Promise<ServiceResponseInputs<ProjectIssueActivity[]>>;
}
