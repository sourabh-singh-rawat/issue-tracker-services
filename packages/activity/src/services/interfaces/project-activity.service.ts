import {
  ProjectPayload,
  ServiceResponseInputs,
} from "@sourabhrawatcc/core-utils";
import { ProjectActivityEntity } from "../../app/entities";

export interface ProjectActivityService {
  logCreatedProject(payload: ProjectPayload): Promise<void>;
  logUpdatedProjectName(payload: ProjectPayload): Promise<void>;
  logUpdatedProjectDescription(payload: ProjectPayload): Promise<void>;
  getProjectActivityList(
    id: string,
  ): Promise<ServiceResponseInputs<ProjectActivityEntity[]>>;
}
