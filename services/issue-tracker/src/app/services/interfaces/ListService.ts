import { PaginatedOutput, PagingOptions } from "@issue-tracker/common";
import { ServiceOptions } from "@issue-tracker/orm";
import { List } from "../../../data";

export interface CreateListOptions extends ServiceOptions {
  userId: string;
  spaceId: string;
  name: string;
}

export interface FindListsOptions extends PagingOptions {
  userId: string;
}

export interface UpdateListOptions extends ServiceOptions {
  id: string;
  name?: string;
}

export interface FindListOptions {
  id: string;
  userId: string;
}

export interface ListService {
  createList(options: CreateListOptions): Promise<string>;
  findList(options: FindListOptions): Promise<List>;
  findLists(options: FindListsOptions): Promise<PaginatedOutput<List>>;
  updateList(options: UpdateListOptions): Promise<void>;
}
