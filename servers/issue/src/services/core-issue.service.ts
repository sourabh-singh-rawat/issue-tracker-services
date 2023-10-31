import {
  DatabaseService,
  IssueFormData,
  IssueListFilters,
  IssuePriority,
  IssueStatus,
  NotFoundError,
  ServiceResponse,
  TransactionExecutionError,
} from "@sourabhrawatcc/core-utils";
import { IssueService } from "./interfaces/issue.service";
import { IssueRepository } from "../data/repositories/interfaces/issue.repository";
import { IssueAssigneeEntity, IssueEntity } from "../data/entities";
import { IssueAssigneeRepository } from "../data/repositories/interfaces/issue-assignee.repository";
import { IssueCommentRepository } from "../data/repositories/interfaces/issue-comment.repository";

export class CoreIssueService implements IssueService {
  constructor(
    private databaseService: DatabaseService,
    private issueRepository: IssueRepository,
    private issueCommentRepository: IssueCommentRepository,
    private issueAssigneeRepository: IssueAssigneeRepository,
  ) {}

  private getStatuses = () => Object.values(IssueStatus);

  private getPriorities = () => Object.values(IssuePriority);

  createIssue = async (userId: string, issueFormData: IssueFormData) => {
    const {
      name,
      description,
      status,
      priority,
      dueDate,
      projectId,
      resolution,
      reporter,
      assignees,
    } = issueFormData;

    const newIssue = new IssueEntity();
    newIssue.name = name;
    newIssue.description = description;
    newIssue.status = status;
    newIssue.priority = priority;
    newIssue.dueDate = dueDate;
    newIssue.projectId = projectId;
    newIssue.resolution = resolution;
    newIssue.ownerId = userId;
    newIssue.reporterId = reporter.userId;

    const queryRunner = this.databaseService.createQueryRunner();
    const result = await this.databaseService.transaction(
      queryRunner,
      async (queryRunner) => {
        const savedIssue = await this.issueRepository.save(newIssue, {
          queryRunner,
        });

        assignees.forEach(async (assignee) => {
          const newAssignee = new IssueAssigneeEntity();
          newAssignee.issueId = savedIssue.id;
          newAssignee.userId = assignee.userId;

          await this.issueAssigneeRepository.save(newAssignee, { queryRunner });
        });

        return savedIssue;
      },
    );

    if (!result) {
      throw new TransactionExecutionError("Failed to save issue");
    }

    return new ServiceResponse({ rows: result.id });
  };

  getIssueList = async (userId: string, filters: IssueListFilters) => {
    const rows = await this.issueRepository.find(userId, filters);

    const statusList = this.getStatuses();
    const priorityList = this.getPriorities();
    return new ServiceResponse({
      rows: rows.map((rest) => ({ ...rest, statusList, priorityList })),
      filteredRowCount: rows.length,
    });
  };

  getIssueStatusList = async () => {
    const statues = this.getStatuses();

    return new ServiceResponse({
      rows: statues,
      filteredRowCount: statues.length,
    });
  };

  getIssuePriorityList = async () => {
    const priority = this.getPriorities();

    return new ServiceResponse({
      rows: priority,
      filteredRowCount: priority.length,
    });
  };

  getIssue = async (issueId: string) => {
    const issueEntity = await this.issueRepository.findOne(issueId);

    if (!issueEntity) throw new NotFoundError("Issue not found");
    const commentCount =
      await this.issueCommentRepository.findCountByIssueId(issueId);

    console.log(commentCount);

    return new ServiceResponse({ rows: issueEntity });
  };

  updateIssue = async (id: string, issueFormData: IssueFormData) => {
    const { name, description, status, priority, dueDate, resolution } =
      issueFormData;
    const updatedIssue = new IssueEntity();
    updatedIssue.name = name;
    updatedIssue.description = description;
    updatedIssue.status = status;
    updatedIssue.priority = priority;
    updatedIssue.dueDate = dueDate;
    updatedIssue.resolution = resolution;

    await this.issueRepository.update(id, updatedIssue);
  };
}
