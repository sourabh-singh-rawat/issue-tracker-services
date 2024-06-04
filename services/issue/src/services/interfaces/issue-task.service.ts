import { ServiceResponse, TaskFormData } from "@issue-tracker/common";
import { IssueTaskEntity } from "../../data/entities";

export interface IssueTaskService {
  createTask(
    userId: string,
    issueId: string,
    taskFormData: TaskFormData,
  ): Promise<void>;
  getIssueTaskList(
    issueId: string,
  ): Promise<ServiceResponse<IssueTaskEntity[]>>;
  updateIssueTask(id: string, taskFormData: TaskFormData): Promise<void>;
}
