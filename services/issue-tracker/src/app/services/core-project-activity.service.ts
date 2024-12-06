import {
  IssueActivity,
  ProjectActivity,
  ServiceResponse,
} from "@issue-tracker/common";
import { IssueCreatedPayload, ProjectPayload } from "@issue-tracker/event-bus";
import { IssueActivityEntity, ListItemActivity } from "../../data";
import { ProjectActivityService } from "./interfaces/project-activity.service";

export class CoreProjectActivityService implements ProjectActivityService {
  constructor() {}

  logCreatedIssue = async (payload: IssueCreatedPayload) => {
    const { id, projectId } = payload;

    const newIssueActivity = new IssueActivityEntity();
    newIssueActivity.issueId = id;
    newIssueActivity.type = IssueActivity.CREATED_ISSUE;
    newIssueActivity.projectId = projectId;
  };

  logCreatedProject = async (payload: ProjectPayload) => {
    const { id, ownerUserId, createdAt } = payload;

    const newProjectActivity = new ListItemActivity();
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.projectId = id;
    newProjectActivity.action = ProjectActivity.CREATED;
    newProjectActivity.createdAt = createdAt;
  };

  logUpdatedProjectName = async (payload: ProjectPayload) => {
    const { id, ownerUserId, updatedAt } = payload;

    if (!updatedAt) {
      throw new Error("Cannot update project description without timestamp");
    }

    const newProjectActivity = new ListItemActivity();
    newProjectActivity.action = ProjectActivity.UPDATED_NAME;
    newProjectActivity.projectId = id;
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.createdAt = updatedAt;
  };

  logUpdatedProjectDescription = async (payload: ProjectPayload) => {
    const { id, ownerUserId, updatedAt } = payload;

    if (!updatedAt) {
      throw new Error("Cannot update project description without timestamp");
    }

    const newProjectActivity = new ListItemActivity();
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.projectId = id;
    newProjectActivity.action = ProjectActivity.UPDATED_DESCRIPTION;
    newProjectActivity.createdAt = updatedAt;
  };

  getProjectActivityList = async (id: string) => {
    return new ServiceResponse({ rows: [], filteredRowCount: 1 });
  };
}
