import { ServiceResponse, TaskFormData } from "@issue-tracker/common";
import { CheckListItem } from "../../../data";

export interface IssueTaskService {
  createTask(
    userId: string,
    issueId: string,
    taskFormData: TaskFormData,
  ): Promise<void>;
  getIssueTaskList(issueId: string): Promise<ServiceResponse<CheckListItem[]>>;
  updateIssueTask(id: string, taskFormData: TaskFormData): Promise<void>;
}
