import { IssueActivityService } from "./interfaces/issue-activity.service";
import { ProjectActivityEntity } from "../data/entities";
import { IssueCreatedPayload } from "@issue-tracker/event-bus";
import { ProjectActivity } from "@issue-tracker/common";
import { ProjectActivityRepository } from "../data/repositories/interfaces/project-activity.repository";

export class CoreIssueActivityService implements IssueActivityService {
  constructor(
    private readonly projectActivityRepository: ProjectActivityRepository,
  ) {}

  logCreatedIssue = async (payload: IssueCreatedPayload) => {
    const { ownerId, projectId, createdAt } = payload;

    const newProjectActivity = new ProjectActivityEntity();
    newProjectActivity.userId = ownerId;
    newProjectActivity.projectId = projectId;
    newProjectActivity.action = ProjectActivity.ISSUE_CREATED;
    newProjectActivity.timestamp = createdAt;

    await this.projectActivityRepository.save(newProjectActivity);
  };
}
