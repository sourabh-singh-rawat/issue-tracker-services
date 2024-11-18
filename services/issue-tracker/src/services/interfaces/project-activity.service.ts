import { ProjectPayload } from "@issue-tracker/event-bus";
import { ListItemActivity } from "../../data/entities";
import { ServiceResponseInputs } from "@issue-tracker/common";

export interface ProjectActivityService {
  logCreatedProject(payload: ProjectPayload): Promise<void>;
  logUpdatedProjectName(payload: ProjectPayload): Promise<void>;
  logUpdatedProjectDescription(payload: ProjectPayload): Promise<void>;
  getProjectActivityList(
    id: string,
  ): Promise<ServiceResponseInputs<ListItemActivity[]>>;
}
