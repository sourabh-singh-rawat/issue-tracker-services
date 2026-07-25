import { ServiceResponse, TaskFormData } from "@pine/common";
import { CheckListItem } from "@/entities/CheckListItem";

export interface IIssueTaskService {
  createTask(userId: string, issueId: string, taskFormData: TaskFormData): Promise<void>;
  getIssueTaskList(issueId: string): Promise<ServiceResponse<CheckListItem[]>>;
  updateIssueTask(id: string, taskFormData: TaskFormData): Promise<void>;
}
