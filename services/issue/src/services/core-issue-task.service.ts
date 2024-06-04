import { IssueTaskService } from "./interfaces/issue-task.service";
import { IssueTaskRepository } from "../data/repositories/interfaces/issue-task.repository";
import { IssueTaskEntity } from "../data/entities";
import { ServiceResponse, TaskFormData } from "@issue-tracker/common";

export class CoreIssueTaskService implements IssueTaskService {
  constructor(private readonly issueTaskRepository: IssueTaskRepository) {}

  createTask = async (
    userId: string,
    issueId: string,
    taskFormData: TaskFormData,
  ) => {
    const { description, dueDate } = taskFormData;

    const newIssueTask = new IssueTaskEntity();
    newIssueTask.description = description;
    newIssueTask.ownerId = userId;
    newIssueTask.issueId = issueId;
    newIssueTask.dueDate = dueDate;

    await this.issueTaskRepository.save(newIssueTask);
  };

  getIssueTaskList = async (issueId: string) => {
    const rows = await this.issueTaskRepository.find(issueId);

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };

  updateIssueTask = async (id: string, taskFormData: TaskFormData) => {
    const { description, completed, dueDate } = taskFormData;
    const updatedIssueTask = new IssueTaskEntity();
    updatedIssueTask.description = description;
    updatedIssueTask.completed = completed;
    updatedIssueTask.dueDate = dueDate;

    await this.issueTaskRepository.update(id, updatedIssueTask);
  };
}
