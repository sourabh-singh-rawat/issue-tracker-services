import { ServiceResponse, TaskFormData } from "@issue-tracker/common";
import { CheckListItem } from "../../data";
import { IssueTaskService } from "./interfaces/issue-task.service";

export class CoreIssueTaskService implements IssueTaskService {
  constructor() {}

  createTask = async (
    userId: string,
    issueId: string,
    taskFormData: TaskFormData,
  ) => {
    const { description, dueDate } = taskFormData;

    const newIssueTask = new CheckListItem();
    newIssueTask.description = description;
    newIssueTask.ownerId = userId;
    newIssueTask.issueId = issueId;
    newIssueTask.dueDate = dueDate;
  };

  getIssueTaskList = async (issueId: string) => {
    return new ServiceResponse({ rows: [], filteredRowCount: 1 });
  };

  updateIssueTask = async (id: string, taskFormData: TaskFormData) => {
    const { description, completed, dueDate } = taskFormData;
    const updatedIssueTask = new CheckListItem();
    updatedIssueTask.description = description;
    updatedIssueTask.completed = completed;
    updatedIssueTask.dueDate = dueDate;
  };
}
