import {
  IssueStatus,
  ITEM_PRIORITY,
  ServiceResponse,
} from "@pine/common";
import { IsNull } from "typeorm";
import { dataSource } from "@/container";
import { Issue } from "../entities/Issue";
import { IssueAssignee } from "../entities/IssueAssignee";
import {
  CreateIssueOptions,
  DeleteIssueOptions,
  FindIssueOptions,
  FindProjectIssuesOptions,
  FindSubIssuesOptions,
  IssueService,
  UpdateIssueOptions,
} from "./interfaces";

export class CoreIssueService implements IssueService {
  constructor() {}

  private getStatuses = () => Object.values(IssueStatus);

  private getPriorities = () => Object.values(ITEM_PRIORITY);

  private async createAssignee(userId: string, id: string) {
    const newAssignee = new IssueAssignee();
    newAssignee.issueId = id;
    newAssignee.userId = userId;
  }

  async createIssue(options: CreateIssueOptions) {
    const { manager, userId, assigneeIds, parentIssueId, estimate, component, ...input } =
      options;
    const IssueRepo = manager.getRepository(Issue);
    const IssueAssigneeRepo = manager.getRepository(IssueAssignee);

    let parentIssue: Issue | null = null;
    if (parentIssueId) {
      parentIssue = await IssueRepo.findOne({ where: { id: parentIssueId } });
    }

    const issue = await IssueRepo.save({
      ...input,
      estimate,
      component,
      createdById: userId,
      parentIssue: parentIssue ? parentIssue : undefined,
    });

    for await (const assigneeId of assigneeIds) {
      await IssueAssigneeRepo.save({ issueId: issue.id, userId: assigneeId });
    }

    return issue.id;
  }

  async findProjectIssues(options: FindProjectIssuesOptions) {
    const { projectId, userId } = options;

    return await Issue.find({
      where: { projectId, createdById: userId, parentIssue: IsNull() },
    });
  }

  async findSubIssues(options: FindSubIssuesOptions) {
    const { userId, parentIssueId } = options;

    const IssueRepo = dataSource.getTreeRepository(Issue);
    const parentIssue = await Issue.findOne({
      where: { id: parentIssueId, createdById: userId },
    });

    if (!parentIssue) throw new Error("Parent not found");

    const tree = await IssueRepo.findDescendantsTree(parentIssue, {
      relations: ["project"],
      depth: 1,
    });

    return tree.subIssues;
  }

  async findIssue(options: FindIssueOptions) {
    const { userId, issueId } = options;

    return await Issue.findOneOrFail({
      where: { id: issueId, createdById: userId },
      relations: { project: true },
    });
  }

  getIssueStatusList = async () => {
    const statues = this.getStatuses();

    return new ServiceResponse({ rows: statues, rowCount: statues.length });
  };

  getIssuePriorityList = async () => {
    const priority = this.getPriorities();

    return new ServiceResponse({ rows: priority, rowCount: priority.length });
  };

  async getIssue(issueId: string) {
    return Issue.findOne({ where: { id: issueId } });
  }

  async updateIssue(options: UpdateIssueOptions) {
    const {
      issueId,
      name,
      manager,
      description,
      dueDate,
      userId,
      priority,
      statusId,
      estimate,
      component,
    } = options;
    const IssueRepo = manager.getRepository(Issue);

    await IssueRepo.update(
      { id: issueId, createdById: userId },
      { name, description, dueDate, statusId, priority, estimate, component },
    );
  }

  updateIssueAssignee = async (id: string, userId: string) => {
    const newIssueAssignee = new IssueAssignee();
    newIssueAssignee.issueId = id;
    newIssueAssignee.userId = userId;

    // await this.issueAssigneeRepository.save();
  };

  async deleteIssue(options: DeleteIssueOptions) {
    const { id, manager } = options;

    const IssueRepo = manager.getRepository(Issue);

    await IssueRepo.delete({ id });
  }
}
