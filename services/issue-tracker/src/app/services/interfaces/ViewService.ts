import { ServiceOptions } from "@issue-tracker/orm";

export interface CreateDefaultViewOptions extends ServiceOptions {
  listId: string;
}

export interface CreateViewOptions extends ServiceOptions {
  name: string;
  listId: string;
  isDefaultView?: boolean;
  systemFields?: string[];
  customFields?: string[];
}

export interface ViewService {
  createDefaultView(options: CreateDefaultViewOptions): Promise<void>;
  createView(options: CreateViewOptions): Promise<void>;
}
