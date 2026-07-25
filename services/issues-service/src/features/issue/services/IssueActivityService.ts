import { ProjectActivity } from "@pine/common";
import { IssueCreatedData } from "@pine/events";
import { ProjectIssueActivity } from "@/entities/ProjectIssueActivity";
import { IIssueActivityService } from "./IIssueActivityService";

export class IssueActivityService implements IIssueActivityService {
  constructor() {}

  logCreatedIssue = async (payload: IssueCreatedData) => {
    const { ownerId, projectId, createdAt } = payload;

    const newProjectActivity = new ProjectIssueActivity();
    newProjectActivity.userId = ownerId;
    newProjectActivity.projectId = projectId;
    newProjectActivity.action = ProjectActivity.ISSUE_CREATED;
    newProjectActivity.createdAt = new Date(createdAt);
  };
}
