import {
  TypeormStore,
  IssueFormData,
  IssueListFilters,
  IssuePriority,
  IssueStatus,
  NotFoundError,
  ServiceResponse,
  TransactionExecutionError,
  UserAlreadyExists,
  IssuePermissions,
  ProjectPermissions,
} from "@sourabhrawatcc/core-utils";
import { IssueService } from "./interfaces/issue.service";
import { IssueRepository } from "../data/repositories/interfaces/issue.repository";
import { IssueAssigneeEntity, IssueEntity } from "../data/entities";
import { IssueAssigneeRepository } from "../data/repositories/interfaces/issue-assignee.repository";
import { IssueCommentRepository } from "../data/repositories/interfaces/issue-comment.repository";
import { CasbinIssueGuardian } from "../app/guardians/casbin/casbin-issue.guardian";
import { QueryRunner } from "typeorm";
import { CasbinProjectGuardian } from "../app/guardians/casbin/casbin-project.guardian";

export class CoreIssueService implements IssueService {
  constructor(
    private postgresTypeormStore: TypeormStore,
    private issueRepository: IssueRepository,
    private issueCommentRepository: IssueCommentRepository,
    private issueAssigneeRepository: IssueAssigneeRepository,
    private issueGuardian: CasbinIssueGuardian,
    private projectGuardian: CasbinProjectGuardian,
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
    await this.projectGuardian.validatePermission(
      userId,
      projectId,
      ProjectPermissions.Create,
    );

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

    const queryRunner = this.postgresTypeormStore.createQueryRunner();
    const result = await this.postgresTypeormStore.transaction(
      queryRunner,
      async (queryRunner) => {
        const savedIssue = await this.issueRepository.save(newIssue, {
          queryRunner,
        });

        assignees.forEach(async (assignee) => {
          // TODO: 2 funcs to create issue assigne and add policy
          await this.createAssignee(
            assignee.userId,
            savedIssue.id,
            queryRunner,
          );
        });

        return savedIssue;
      },
    );

    if (!result) {
      throw new TransactionExecutionError("Failed to save issue");
    }

    this.issueGuardian.createReporter(userId, result.id);

    return new ServiceResponse({ rows: result.id });
  };

  private createAssignee = async (
    userId: string,
    id: string,
    queryRunner: QueryRunner,
  ) => {
    const newAssignee = new IssueAssigneeEntity();
    newAssignee.issueId = id;
    newAssignee.userId = userId;

    await this.issueAssigneeRepository.save(newAssignee, { queryRunner });
    await this.issueGuardian.createAssignee(userId, id);
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

    return new ServiceResponse({ rows: issueEntity });
  };

  updateIssue = async (
    userId: string,
    id: string,
    issueFormData: IssueFormData,
  ) => {
    await this.issueGuardian.validatePermission(
      userId,
      id,
      IssuePermissions.EditIssue,
    );

    const { name, description, priority, dueDate, resolution } = issueFormData;
    const updatedIssue = new IssueEntity();
    updatedIssue.name = name;
    updatedIssue.description = description;
    updatedIssue.priority = priority;
    updatedIssue.dueDate = dueDate;
    updatedIssue.resolution = resolution;

    await this.issueRepository.update(id, updatedIssue);
  };

  updateIssueStatus = async (
    userId: string,
    id: string,
    status: IssueStatus,
  ) => {
    await this.issueGuardian.validatePermission(
      userId,
      id,
      IssuePermissions.EditIssueStatus,
    );

    const updatedIssue = new IssueEntity();
    updatedIssue.status = status;
    await this.issueRepository.update(id, updatedIssue);
  };

  updateIssueResolution = async (
    userId: string,
    id: string,
    resolution: boolean,
  ) => {
    await this.issueGuardian.validatePermission(
      userId,
      id,
      IssuePermissions.EditIssue,
    );

    const updatedIssue = new IssueEntity();
    updatedIssue.resolution = resolution;

    await this.issueRepository.update(id, updatedIssue);
    await this.issueRepository.softDelete(id);

    // if "yes" then soft delete
    // if "no" then restore soft delete
  };

  updateIssueAssignee = async (id: string, userId: string) => {
    const issue = await this.issueRepository.findOne(id);
    if (!issue) throw new NotFoundError(`Issue ${id} does not exist`);

    // check if the assignee is already assigned the issue
    const assignee =
      await this.issueAssigneeRepository.findAssigneeByUserId(userId);
    if (assignee) throw new UserAlreadyExists();

    const newIssueAssignee = new IssueAssigneeEntity();
    newIssueAssignee.issueId = id;
    newIssueAssignee.userId = userId;

    // await this.issueAssigneeRepository.save();
  };
}
