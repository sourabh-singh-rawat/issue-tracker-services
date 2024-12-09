import {
  IssueStatus,
  ITEM_PRIORITY,
  ServiceResponse,
} from "@issue-tracker/common";
import { NatsPublisher } from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { IsNull } from "typeorm";
import { dataSource } from "../..";
import { Item, ItemAssignee } from "../../data";
import {
  CreateItemOptions,
  DeleteItemOptions,
  FindItemOptions,
  FindListItemsOptions,
  FindSubItemsOptions,
  ItemService,
  UpdateItemOptions,
} from "./interfaces/ItemService";

export class CoreItemService implements ItemService {
  constructor(
    private orm: Typeorm,
    private readonly publisher: NatsPublisher,
  ) {}

  private getStatuses = () => Object.values(IssueStatus);

  private getPriorities = () => Object.values(ITEM_PRIORITY);

  private async createAssignee(userId: string, id: string) {
    const newAssignee = new ItemAssignee();
    newAssignee.itemId = id;
    newAssignee.userId = userId;
  }

  private async isArchived(id: string) {}

  async createItem(options: CreateItemOptions) {
    const { manager, userId, assigneeIds, parentItemId, ...input } = options;
    const ItemRepo = manager.getRepository(Item);
    const ItemAssigneeRepo = manager.getRepository(ItemAssignee);

    let parentItem: Item | null = null;
    if (parentItemId) {
      parentItem = await ItemRepo.findOne({ where: { id: parentItemId } });
    }

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

  async getIssue(issueId: string) {
    return Item.findOne({ where: { id: issueId } });
  }

  async updateItem(options: UpdateItemOptions) {
    const {
      itemId,
      name,
      manager,
      description,
      statusId: status,
      priority,
      dueDate,
      userId,
    } = options;
    const ItemRepo = manager.getRepository(Item);

    await this.isArchived(itemId);

    await ItemRepo.update(
      { id: itemId, createdById: userId },
      { name, description, statusId: status, priority, dueDate },
    );
  }

  updateIssueStatus = async (
    userId: string,
    id: string,
    status: IssueStatus,
  ) => {
    await this.isArchived(id);

    const updatedIssue = new Item();
    updatedIssue.statusId = status;
  };

  updateIssueResolution = async (
    userId: string,
    id: string,
    resolution: boolean,
  ) => {
    const updatedIssue = new Item();
  };

  updateIssueAssignee = async (id: string, userId: string) => {
    await this.isArchived(id);

    const newIssueAssignee = new ItemAssignee();
    newIssueAssignee.itemId = id;
    newIssueAssignee.userId = userId;

    // await this.issueAssigneeRepository.save();
  };

  async deleteItem(options: DeleteItemOptions) {
    const { id, manager } = options;

    const ItemRepo = manager.getRepository(Item);

    await ItemRepo.delete({ id });
  }
}
