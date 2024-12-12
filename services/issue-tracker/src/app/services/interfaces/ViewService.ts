import { ServiceOptions } from "@issue-tracker/orm";

export interface CreateInitialViews extends ServiceOptions {
  listId: string;
}

export interface CreateViewOptions extends ServiceOptions {
  name: string;
  listId: string;
}

export interface ViewService {
  createIntialViews(options: CreateInitialViews): Promise<void>;
  createView(options: CreateViewOptions): Promise<void>;
}
