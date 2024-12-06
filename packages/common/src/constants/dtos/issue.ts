import { ProjectMember } from ".";
import { ItemPriority } from "../enums";
import { IssueStatus } from "../enums/issue-status";

interface IssueProps {
  id: string;
  name: string;
  ownerId: string;
  status: IssueStatus | string;
  priority: ItemPriority | string;
  projectId: string;
  resolution: boolean;
  createdAt: string | Date;
  updatedAt?: string | Date;
  commentCount?: number;
  description?: string;
  reporter?: ProjectMember;
  assignees?: ProjectMember[];
}

export class Issue {
  id: string;
  name: string;
  ownerId: string;
  status: IssueStatus | string;
  priority: ItemPriority | string;
  projectId: string;
  resolution: boolean;
  createdAt: string | Date;
  updatedAt?: string | Date;
  commentCount?: number;
  description?: string;
  reporter?: ProjectMember;
  assignees?: ProjectMember[];

  constructor({
    id,
    name,
    ownerId,
    status,
    priority,
    projectId,
    resolution,
    createdAt,
    updatedAt,
    commentCount,
    description,
    reporter,
    assignees,
  }: IssueProps) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.status = status;
    this.priority = priority;
    this.projectId = projectId;
    this.resolution = resolution;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.commentCount = commentCount;
    this.description = description;
    this.reporter = reporter;
    this.assignees = assignees;
  }
}
