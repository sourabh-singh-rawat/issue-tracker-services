import {
  IssueStatus,
  ITEM_PRIORITY,
  ServiceResponse,
} from "@issue-tracker/common";
import { IsNull } from "typeorm";
import { postgres } from "../..";
import { Item, ItemAssignee } from "../../data";
import {
  CreateItemOptions,
  DeleteItemOptions,
  FieldService,
  FindItemOptions,
  FindListItemsOptions,
  FindSubItemsOptions,
  ItemService,
  UpdateItemOptions,
} from "./interfaces";

export class CoreItemService implements ItemService {
  constructor(private readonly fieldService: FieldService) {}

  private getStatuses = () => Object.values(IssueStatus);

  private getPriorities = () => Object.values(ITEM_PRIORITY);

  private async createAssignee(userId: string, id: string) {
    const newAssignee = new ItemAssignee();
    newAssignee.itemId = id;
    newAssignee.userId = userId;
  }

  async createItem(options: CreateItemOptions) {
    const { manager, userId, assigneeIds, parentItemId, fields, ...input } =
      options;
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

    if (fields) {
      for await (const field of Object.keys(fields)) {
        // find fields and check if it is status field
        this.fieldService.createFieldValue({
          manager,
          id: field,
          value: fields[field],
        });
      }
    }

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

    const ItemRepo = postgres.getTreeRepository(Item);
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
    const { itemId, name, manager, description, dueDate, userId } = options;
    const ItemRepo = manager.getRepository(Item);

    await ItemRepo.update(
      { id: itemId, createdById: userId },
      { name, description, dueDate },
    );
  }

  updateIssueAssignee = async (id: string, userId: string) => {
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
