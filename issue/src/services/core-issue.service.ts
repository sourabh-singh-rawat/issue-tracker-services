import {
  DatabaseService,
  IssueRegistrationData,
  ServiceResponse,
  TransactionExecutionError,
} from "@sourabhrawatcc/core-utils";
import { IssueService } from "./interfaces/issue.service";
import { IssueRepository } from "../data/repositories/interfaces/issue.repository";
import { IssueAssigneeEntity, IssueEntity } from "../data/entities";
import { IssueAssigneeRepository } from "../data/repositories/interfaces/issue-assignee.repository";

export class CoreIssueService implements IssueService {
  constructor(
    private databaseService: DatabaseService,
    private issueRepository: IssueRepository,
    private issueAssigneeRepository: IssueAssigneeRepository,
  ) {}

  createIssue = async (
    userId: string,
    issueRegistrationData: IssueRegistrationData,
  ) => {
    const {
      name,
      description,
      status,
      priority,
      dueDate,
      projectId,
      resolution,
      reporterId,
      assignees,
    } = issueRegistrationData;

    const newIssue = new IssueEntity();
    newIssue.name = name;
    newIssue.description = description;
    newIssue.status = status;
    newIssue.priority = priority;
    newIssue.dueDate = dueDate;
    newIssue.ownerId = userId;
    newIssue.projectId = projectId;
    newIssue.resolution = resolution;
    newIssue.reporterId = reporterId;

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
          // @ts-ignore
          newAssignee.userId = assignee.id;

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
}
