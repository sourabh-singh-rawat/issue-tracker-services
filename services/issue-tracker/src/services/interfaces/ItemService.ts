import { Item } from "../../data/entities";
import {
  IssuePriority,
  ServiceResponse,
  IssueStatus,
  PagingOptions,
  PaginatedOutput,
} from "@issue-tracker/common";
import { ServiceOptions } from "./WorkspaceService";

export interface CreateItemOptions extends ServiceOptions {
  userId: string;
  listId: string;
  type: string;
  name: string;
  status: IssueStatus;
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

export interface FindItemsOptions extends PagingOptions {
  userId: string;
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

export interface ItemService {
  createItem(options: CreateItemOptions): Promise<string>;
  findItem(options: FindItemOptions): Promise<Item | null>;
  findItems(options: FindItemsOptions): Promise<PaginatedOutput<Item>>;
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
