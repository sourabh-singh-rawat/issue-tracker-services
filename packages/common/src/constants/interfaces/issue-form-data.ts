import { ProjectMember } from "../dtos";
import { IssuePriority, IssueStatus } from "../enums";

export interface IssueFormData {
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
