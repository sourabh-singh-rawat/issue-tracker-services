import { ProjectMember } from "../dtos";
import { IssueStatus, ItemPriority } from "../enums";

export interface IssueFormData {
  name: string;
  projectId: string;
  status: IssueStatus;
  priority: ItemPriority;
  reporter: ProjectMember;
  assignees: ProjectMember[];
  resolution: boolean;
  dueDate?: Date;
  id?: string;
  description?: string;
}
