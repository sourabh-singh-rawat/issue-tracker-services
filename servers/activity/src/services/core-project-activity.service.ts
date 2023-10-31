import {
  ProjectActivity,
  ProjectPayload,
  ServiceResponse,
} from "@sourabhrawatcc/core-utils";
import { ProjectActivityService } from "./interfaces/project-activity.service";
import { ProjectActivityEntity } from "../data/entities";
import { ProjectActivityRepository } from "../data/repositories/interfaces/project-activity.repository";

export class CoreProjectActivityService implements ProjectActivityService {
  constructor(
    private readonly projectActivityRepository: ProjectActivityRepository,
  ) {}

  logProjectCreated = async (payload: ProjectPayload) => {
    const { id, ownerUserId, createdAt } = payload;

    const newProjectActivity = new ProjectActivityEntity();
    newProjectActivity.type = ProjectActivity.CREATED;
    newProjectActivity.projectId = id;
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.timestamp = createdAt;

    await this.projectActivityRepository.save(newProjectActivity);
  };

  logProjectNameUpdated = async (payload: ProjectPayload) => {
    const { id, ownerUserId, updatedAt } = payload;

    if (!updatedAt) {
      throw new Error("Cannot update project description without timestamp");
    }

    const newProjectActivity = new ProjectActivityEntity();
    newProjectActivity.type = ProjectActivity.UPDATED_NAME;
    newProjectActivity.projectId = id;
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.timestamp = updatedAt;

    await this.projectActivityRepository.save(newProjectActivity);
  };

  logProjectDescriptionUpdated = async (payload: ProjectPayload) => {
    const { id, ownerUserId, updatedAt } = payload;

    if (!updatedAt) {
      throw new Error("Cannot update project description without timestamp");
    }

    const newProjectActivity = new ProjectActivityEntity();
    newProjectActivity.type = ProjectActivity.UPDATED_DESCRIPTION;
    newProjectActivity.projectId = id;
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.timestamp = updatedAt;

    await this.projectActivityRepository.save(newProjectActivity);
  };

  getProjectActivityList = async (id: string) => {
    const rows =
      await this.projectActivityRepository.findActivityByProjectId(id);

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };
}
