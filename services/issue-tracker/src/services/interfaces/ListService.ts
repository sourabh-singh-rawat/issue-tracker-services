import { PaginatedOutput, PagingOptions } from "@issue-tracker/common";
import { List } from "../../data/entities";
import { ServiceOptions } from "@issue-tracker/orm";

export interface CreateListOptions extends ServiceOptions {
  userId: string;
  name: string;
  description?: string;
}

export interface FindListsOptions extends PagingOptions {
  userId: string;
}

export interface UpdateListOptions extends ServiceOptions {
  id: string;
  name?: string;
  description?: string;
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
