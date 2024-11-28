import { PaginatedOutput } from "@issue-tracker/common";
import { CreateItemInput, Item, UpdateItemInput } from "../types";

export interface ItemResolver {
  createItem(ctx: any, input: CreateItemInput): Promise<string>;
  findItem(ctx: any, id: string): Promise<Item | null>;
  findItems(ctx: any, listId: string): Promise<PaginatedOutput<Item>>;
  updateItem(ctx: any, update: UpdateItemInput): Promise<string>;
}
