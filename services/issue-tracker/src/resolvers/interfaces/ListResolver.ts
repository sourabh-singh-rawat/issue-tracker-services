import { PaginatedOutput } from "@issue-tracker/common";
import { List } from "../../data/entities";
import { CreateListInput } from "../types";

export interface ListResolver {
  createList(ctx: any, input: CreateListInput): Promise<string>;
  findLists(ctx: any): Promise<PaginatedOutput<List>>;
}
