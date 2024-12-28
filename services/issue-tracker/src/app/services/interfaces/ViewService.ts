import { ViewType } from "@issue-tracker/common";
import { ServiceOptions } from "@issue-tracker/orm";
import { View } from "../../../data";

export interface CreateDefaultViewOptions extends ServiceOptions {
  listId: string;
  userId: string;
}

export interface CreateViewOptions extends ServiceOptions {
  name: string;
  listId: string;
  type: ViewType;
  userId: string;
  isDefaultView?: boolean;
  systemFields?: string[];
  customFields?: string[];
}

export interface GetViewsOptions extends ServiceOptions {
  listId: string;
  userId: string;
}

/**
 * Views decided how items are displayed, filtered and grouped
 */
export interface ViewService {
  createDefaultViews(options: CreateDefaultViewOptions): Promise<string>;
  createView(options: CreateViewOptions): Promise<string>;
  findViews(options: GetViewsOptions): Promise<View[]>;
  findView(viewId: string): Promise<View>;
}
