import { ServiceResponseInputs } from "@pine/common";
import { ProjectData } from "@pine/events";
import { ProjectIssueActivity } from "@/entities/ProjectIssueActivity";

export interface IProjectActivityService {
  logCreatedProject(payload: ProjectData): Promise<void>;
  logUpdatedProjectName(payload: ProjectData): Promise<void>;
  logUpdatedProjectDescription(payload: ProjectData): Promise<void>;
  getProjectActivityList(id: string): Promise<ServiceResponseInputs<ProjectIssueActivity[]>>;
}
