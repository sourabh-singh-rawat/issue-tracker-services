import { PaginatedOutput } from "@issue-tracker/common";
import {
  CreateItemInput,
  FindItemsInput,
  Item,
  UpdateItemInput,
} from "../types";

export interface ItemResolver {
  createItem(ctx: any, input: CreateItemInput): Promise<string>;
  findItem(ctx: any, id: string): Promise<Item | null>;
  findListItems(ctx: any, listId: string): Promise<Item[]>;
  findSubItems(ctx: any, options: FindItemsInput): Promise<Item[]>;
  updateItem(ctx: any, update: UpdateItemInput): Promise<string>;
}
