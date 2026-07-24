import { ProjectActivity } from "@pine/common";
import { IssueCreatedPayload } from "@pine/event-bus";
import { ProjectIssueActivity } from "@/entities/ProjectIssueActivity";
import { IIssueActivityService } from "./IIssueActivityService";

export class IssueActivityService implements IIssueActivityService {
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
