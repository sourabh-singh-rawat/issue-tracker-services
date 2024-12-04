import { ServiceOptions } from "@issue-tracker/orm";
import { Item } from "../../data/entities";
import {
  IssuePriority,
  ServiceResponse,
  IssueStatus,
  PagingOptions,
  PaginatedOutput,
} from "@issue-tracker/common";

export interface CreateItemOptions extends ServiceOptions {
  userId: string;
  listId: string;
  type: string;
  name: string;
  statusId: string;
  priority: IssuePriority;
  assigneeIds: string[];
  description?: string;
  dueDate?: Date;
  parentItemId?: string;
}

export interface FindItemOptions {
  userId: string;
  itemId: string;
}

export interface FindSubItemsOptions extends PagingOptions {
  userId: string;
  listId: string;
  parentItemId: string;
}

export interface UpdateItemOptions extends ServiceOptions {
  userId: string;
  itemId: string;
  type?: string;
  name?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  assigneeIds?: string[];
  description?: string;
  dueDate?: Date;
}

export interface FindListItemsOptions {
  listId: string;
  userId: string;
}

export interface ItemService {
  createItem(options: CreateItemOptions): Promise<string>;
  findItem(options: FindItemOptions): Promise<Item | null>;
  findListItems(options: FindListItemsOptions): Promise<Item[]>;
  findSubItems(options: FindSubItemsOptions): Promise<Item[]>;
  getIssue(issueId: string): Promise<Item>;
  getIssueStatusList(): Promise<ServiceResponse<IssueStatus[]>>;
  getIssuePriorityList(): Promise<ServiceResponse<IssuePriority[]>>;
  updateItem(options: UpdateItemOptions): Promise<void>;
  updateIssueStatus(
    userId: string,
    id: string,
    status: IssueStatus,
  ): Promise<void>;
  updateIssueResolution(
    userId: string,
    id: string,
    resolution: boolean,
  ): Promise<void>;
}
