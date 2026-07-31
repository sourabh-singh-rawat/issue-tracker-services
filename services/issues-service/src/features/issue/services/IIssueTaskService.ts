import { ServiceResponse, TaskFormData } from "@pine/common";
import type { CheckListItem } from "@/db";

export interface IIssueTaskService {
  createTask(userId: string, issueId: string, taskFormData: TaskFormData): Promise<void>;
  getIssueTaskList(issueId: string): Promise<ServiceResponse<CheckListItem[]>>;
  updateIssueTask(id: string, taskFormData: TaskFormData): Promise<void>;
}
