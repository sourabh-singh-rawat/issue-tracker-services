import { ProjectMember } from ".";
import { IssuePriority } from "../enums";
import { IssueStatus } from "@issue-tracker/common";

interface IssueFormDataProps {
  name: string;
  projectId: string;
  status: IssueStatus;
  priority: IssuePriority;
  reporter: ProjectMember;
  assignees: ProjectMember[];
  resolution: boolean;
  dueDate?: Date;
  id?: string;
  description?: string;
}

export class IssueFormData {
  name: string;
  projectId: string;
  status: IssueStatus;
  priority: IssuePriority;
  reporter: ProjectMember;
  assignees: ProjectMember[];
  resolution: boolean;
  dueDate?: Date;
  id?: string;
  description?: string;

  constructor({
    name,
    projectId,
    status,
    priority,
    reporter,
    assignees,
    resolution,
    dueDate,
    id,
    description,
  }: IssueFormDataProps) {
    this.name = name;
    this.projectId = projectId;
    this.status = status;
    this.priority = priority;
    this.reporter = reporter;
    this.assignees = assignees;
    this.resolution = resolution;
    this.dueDate = dueDate;
    this.id = id;
    this.description = description;
  }
}
