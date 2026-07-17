import { ProjectActivity } from "@pine/common";
import { IssueCreatedPayload } from "@pine/event-bus";
import { ProjectIssueActivity } from "@/features/project/entities/ProjectIssueActivity";
import { IssueActivityService } from "./interfaces/issue-activity.service";

export class CoreIssueActivityService implements IssueActivityService {
  constructor() {}

  logCreatedIssue = async (payload: IssueCreatedPayload) => {
    const { ownerId, projectId, createdAt } = payload;

    const newProjectActivity = new ProjectIssueActivity();
    newProjectActivity.userId = ownerId;
    newProjectActivity.projectId = projectId;
    newProjectActivity.action = ProjectActivity.ISSUE_CREATED;
    newProjectActivity.createdAt = createdAt;
  };
}
