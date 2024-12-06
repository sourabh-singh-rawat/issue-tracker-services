import { PaginatedOutput } from "@issue-tracker/common";
import { CreateListInput, List } from "../types";

export interface ListResolver {
  createList(ctx: any, input: CreateListInput): Promise<string>;
  findList(ctx: any, id: string): Promise<List>;
  findLists(ctx: any): Promise<PaginatedOutput<List>>;
}
