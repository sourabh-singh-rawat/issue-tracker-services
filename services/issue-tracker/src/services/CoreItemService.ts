import {
  CreateItemOptions,
  FindItemOptions,
  FindListItemsOptions,
  FindSubItemsOptions,
  ItemService,
  UpdateItemOptions,
} from "./interfaces/ItemService";
import { IssueRepository } from "../data/repositories/interfaces/issue.repository";
import { ItemAssignee, Item } from "../data/entities";
import { IssueAssigneeRepository } from "../data/repositories/interfaces/issue-assignee.repository";
import { IsNull, QueryRunner } from "typeorm";
import {
  ConflictError,
  IssuePriority,
  IssueStatus,
  NotFoundError,
  ServiceResponse,
  UserAlreadyExists,
} from "@issue-tracker/common";
import { Typeorm } from "@issue-tracker/orm";
import { NatsPublisher } from "@issue-tracker/event-bus";
import { dataSource } from "..";

export class CoreItemService implements ItemService {
  constructor(
    private orm: Typeorm,
    private readonly publisher: NatsPublisher,
    private issueRepository: IssueRepository,
    private issueAssigneeRepository: IssueAssigneeRepository,
  ) {}

  private getStatuses = () => Object.values(IssueStatus);

  private getPriorities = () => Object.values(IssuePriority);

  private async createAssignee(
    userId: string,
    id: string,
    queryRunner: QueryRunner,
  ) {
    const newAssignee = new ItemAssignee();
    newAssignee.itemId = id;
    newAssignee.userId = userId;

    await this.issueAssigneeRepository.save(newAssignee, { queryRunner });
  }

  private async isArchived(id: string) {
    const isArchived = await this.issueRepository.isIssueArchived(id);
    if (isArchived) throw new ConflictError("Issue is archived");
  }

  async createItem(options: CreateItemOptions) {
    const { manager, userId, assigneeIds, parentItemId, ...input } = options;
    const ItemRepo = manager.getRepository(Item);
    const ItemAssigneeRepo = manager.getRepository(ItemAssignee);

    const parentItem = await ItemRepo.findOne({ where: { id: parentItemId } });
    const item = await ItemRepo.save({
      ...input,
      createdById: userId,
      parentItem: parentItem ? parentItem : undefined,
    });

    for await (const assigneeId of assigneeIds) {
      await ItemAssigneeRepo.save({ itemId: item.id, userId: assigneeId });
    }

    return item.id;
  }

  async findListItems(options: FindListItemsOptions) {
    const { listId, userId } = options;

    return await Item.find({
      where: { listId, createdById: userId, parentItem: IsNull() },
    });
  }

  async findSubItems(options: FindSubItemsOptions) {
    const { userId, listId, parentItemId } = options;

    const ItemRepo = dataSource.getTreeRepository(Item);
    const parentItem = await Item.findOne({
      where: { id: parentItemId, listId, createdById: userId },
    });

    if (!parentItem) throw new Error("Parent not found");

    const tree = await ItemRepo.findDescendantsTree(parentItem, {
      relations: ["list"],
      depth: 1,
    });

    return tree.subItems;
  }

  async findItem(options: FindItemOptions) {
    const { userId, itemId } = options;

    return await Item.findOneOrFail({
      where: { id: itemId, createdById: userId },
      relations: { list: true },
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

  getIssue = async (issueId: string) => {
    const issueEntity = await this.issueRepository.findOne(issueId);

    if (!issueEntity) throw new NotFoundError("Issue not found");

    return issueEntity;
  };

  async updateItem(options: UpdateItemOptions) {
    const { itemId, name, manager, description, priority, dueDate, userId } =
      options;
    const ItemRepo = manager.getRepository(Item);

    await this.isArchived(itemId);

    await ItemRepo.update(
      { id: itemId, createdById: userId },
      { name, description, priority, dueDate },
    );
  }

  updateIssueStatus = async (
    userId: string,
    id: string,
    status: IssueStatus,
  ) => {
    await this.isArchived(id);

    const updatedIssue = new Item();
    updatedIssue.status = status;
    await this.issueRepository.update(id, updatedIssue);
  };

  updateIssueResolution = async (
    userId: string,
    id: string,
    resolution: boolean,
  ) => {
    const updatedIssue = new Item();

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

    const newIssueAssignee = new ItemAssignee();
    newIssueAssignee.itemId = id;
    newIssueAssignee.userId = userId;

    // await this.issueAssigneeRepository.save();
  };
}
