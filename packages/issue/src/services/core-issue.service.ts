import {
  TypeormStore,
  IssueFormData,
  IssueListFilters,
  IssuePriority,
  NotFoundError,
  ServiceResponse,
  TransactionExecutionError,
  UserAlreadyExists,
  IssuePermissions,
  ProjectPermissions,
  ConflictError,
} from "@sourabhrawatcc/core-utils";
import { IssueService } from "./interfaces/issue.service";
import { IssueRepository } from "../repositories/interfaces/issue.repository";
import { IssueAssigneeEntity, IssueEntity } from "../app/entities";
import { IssueAssigneeRepository } from "../repositories/interfaces/issue-assignee.repository";
import { IssueCommentRepository } from "../repositories/interfaces/issue-comment.repository";
import { CasbinIssueGuardian } from "../app/guardians/casbin/casbin-issue.guardian";
import { QueryRunner } from "typeorm";
import { CasbinProjectGuardian } from "../app/guardians/casbin/casbin-project.guardian";
import { IssueCreatedPublisher } from "../messages/publishers/issue-created.publisher";
import { IssueStatus } from "@issue-tracker/common";

export class CoreIssueService implements IssueService {
  constructor(
    private store: TypeormStore,
    private issueRepository: IssueRepository,
    private issueCommentRepository: IssueCommentRepository,
    private issueAssigneeRepository: IssueAssigneeRepository,
    private issueGuardian: CasbinIssueGuardian,
    private projectGuardian: CasbinProjectGuardian,
    private issueCreatedPublisher: IssueCreatedPublisher,
  ) {}

  private getStatuses = () => Object.values(IssueStatus);

  private getPriorities = () => Object.values(IssuePriority);

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

  private isArchived = async (id: string) => {
    const isArchived = await this.issueRepository.isIssueArchived(id);
    if (isArchived) throw new ConflictError("Issue is archived");
  };

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
    newIssue.createdById = userId;
    newIssue.reporterId = reporter.userId;

    const queryRunner = this.store.createQueryRunner();
    const result = await this.store.transaction(
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

    await this.issueGuardian.createReporter(userId, result.id);
    await this.issueCreatedPublisher.publish({
      createdAt: result.createdAt,
      id: result.id,
      name: result.name,
      description: result.description,
      ownerId: result.createdById,
      projectId: result.projectId,
      reporterId: result.reporterId,
    });

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

    return new ServiceResponse({ rows: issueEntity });
  };

  updateIssue = async (
    userId: string,
    id: string,
    issueFormData: IssueFormData,
  ) => {
    await this.isArchived(id);
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
    await this.isArchived(id);
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

    await this.issueRepository.updateResolution(id, updatedIssue);
    if (resolution) {
      return await this.issueRepository.softDelete(id);
    }

    await this.issueRepository.restoreDelete(id);
  };

  updateIssueAssignee = async (id: string, userId: string) => {
    await this.isArchived(id);
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