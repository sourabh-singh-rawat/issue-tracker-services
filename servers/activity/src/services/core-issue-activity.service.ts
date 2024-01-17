import {
  IssueActivity,
  IssueCreatedPayload,
  ProjectActivity,
} from "@sourabhrawatcc/core-utils";
import { IssueActivityService } from "./interfaces/issue-activity.service";
import { ProjectActivityRepository } from "../data/repositories/interfaces/project-activity.repository";
import { ProjectActivityEntity } from "../data/entities";

export class CoreIssueActivityService implements IssueActivityService {
  constructor(
    private readonly projectActivityRepository: ProjectActivityRepository,
  ) {}

  logIssueCreated = async (payload: IssueCreatedPayload) => {
    const { ownerId, projectId, createdAt } = payload;

    const newProjectActivity = new ProjectActivityEntity();
    newProjectActivity.userId = ownerId;
    newProjectActivity.projectId = projectId;
    newProjectActivity.action = ProjectActivity.ISSUE_CREATED;
    newProjectActivity.timestamp = createdAt;

    await this.projectActivityRepository.save(newProjectActivity);
  };
}
