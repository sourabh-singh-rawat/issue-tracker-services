import {
  ProjectPayload,
  ServiceResponseInputs,
} from "@sourabhrawatcc/core-utils";
import { ProjectActivityEntity } from "../../data/entities";

export interface ProjectActivityService {
  logProjectCreated(payload: ProjectPayload): Promise<void>;
  logProjectNameUpdated(payload: ProjectPayload): Promise<void>;
  logProjectDescriptionUpdated(payload: ProjectPayload): Promise<void>;
  getProjectActivityList(
    id: string,
  ): Promise<ServiceResponseInputs<ProjectActivityEntity[]>>;
}
