import { ProjectActivity } from "@issue-tracker/common";
import { IssueCreatedPayload } from "@issue-tracker/event-bus";
import { ListItemActivity } from "../../data";
import { IssueActivityService } from "./interfaces/issue-activity.service";

export class CoreIssueActivityService implements IssueActivityService {
  constructor() {}

  logCreatedIssue = async (payload: IssueCreatedPayload) => {
    const { ownerId, projectId, createdAt } = payload;

    const newProjectActivity = new ListItemActivity();
    newProjectActivity.userId = ownerId;
    newProjectActivity.projectId = projectId;
    newProjectActivity.action = ProjectActivity.ISSUE_CREATED;
    newProjectActivity.createdAt = createdAt;
  };
}
