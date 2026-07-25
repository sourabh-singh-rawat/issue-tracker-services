import { IssueActivity as IssueActivityType, ProjectActivity, ServiceResponse } from "@pine/common";
import { IssueCreatedData, ProjectData } from "@pine/events";
import { IssueActivity } from "@/entities/IssueActivity";
import { ProjectIssueActivity } from "@/entities/ProjectIssueActivity";
import { IProjectActivityService } from "./IProjectActivityService";

export class ProjectActivityService implements IProjectActivityService {
  constructor() {}

  logCreatedIssue = async (payload: IssueCreatedData) => {
    const { id, projectId } = payload;

    const newIssueActivity = new IssueActivity();
    newIssueActivity.issueId = id;
    newIssueActivity.type = IssueActivityType.CREATED_ISSUE;
    newIssueActivity.projectId = projectId;
  };

  logCreatedProject = async (payload: ProjectData) => {
    const { id, ownerUserId, createdAt } = payload;

    const newProjectActivity = new ProjectIssueActivity();
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.projectId = id;
    newProjectActivity.action = ProjectActivity.CREATED;
    newProjectActivity.createdAt = new Date(createdAt);
  };

  logUpdatedProjectName = async (payload: ProjectData) => {
    const { id, ownerUserId, updatedAt } = payload;

    if (!updatedAt) {
      throw new Error("Cannot update project description without timestamp");
    }

    const newProjectActivity = new ProjectIssueActivity();
    newProjectActivity.action = ProjectActivity.UPDATED_NAME;
    newProjectActivity.projectId = id;
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.createdAt = new Date(updatedAt);
  };

  logUpdatedProjectDescription = async (payload: ProjectData) => {
    const { id, ownerUserId, updatedAt } = payload;

    if (!updatedAt) {
      throw new Error("Cannot update project description without timestamp");
    }

    const newProjectActivity = new ProjectIssueActivity();
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.projectId = id;
    newProjectActivity.action = ProjectActivity.UPDATED_DESCRIPTION;
    newProjectActivity.createdAt = new Date(updatedAt);
  };

  getProjectActivityList = async (id: string) => {
    return new ServiceResponse({ rows: [], filteredRowCount: 1 });
  };
}
