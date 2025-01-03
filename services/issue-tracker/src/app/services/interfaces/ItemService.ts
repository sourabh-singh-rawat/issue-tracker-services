import {
  IssueStatus,
  ItemPriority,
  PagingOptions,
  ServiceResponse,
} from "@issue-tracker/common";
import { ServiceOptions } from "@issue-tracker/orm";
import { Item } from "../../../data";

export interface CreateItemOptions extends ServiceOptions {
  userId: string;
  listId: string;
  type: string;
  name: string;
  assigneeIds: string[];
  description?: string;
  dueDate?: Date;
  statusId?: string;
  priority?: ItemPriority;
  parentItemId?: string;
  fields?: Record<string, string | null | string[]>;
}

export interface FindItemOptions {
  userId: string;
  itemId: string;
}

export interface FindSubItemsOptions extends PagingOptions {
  userId: string;
  parentItemId: string;
}

export interface UpdateItemOptions extends ServiceOptions {
  userId: string;
  itemId: string;
  type?: string;
  name?: string;
  statusId?: string;
  priority?: ItemPriority;
  assigneeIds?: string[];
  description?: string;
  dueDate?: Date;
}

export interface FindListItemsOptions {
  listId: string;
  userId: string;
}

export interface DeleteItemOptions extends ServiceOptions {
  id: string;
}

export interface ItemService {
  createItem(options: CreateItemOptions): Promise<string>;
  findItem(options: FindItemOptions): Promise<Item | null>;
  findListItems(options: FindListItemsOptions): Promise<Item[]>;
  findSubItems(options: FindSubItemsOptions): Promise<Item[]>;
  getIssue(issueId: string): Promise<Item | null>;
  getIssueStatusList(): Promise<ServiceResponse<IssueStatus[]>>;
  getIssuePriorityList(): Promise<ServiceResponse<ItemPriority[]>>;
  updateItem(options: UpdateItemOptions): Promise<void>;
  deleteItem(options: DeleteItemOptions): Promise<void>;
}
