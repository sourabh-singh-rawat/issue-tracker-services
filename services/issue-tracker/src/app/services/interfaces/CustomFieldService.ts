import { ServiceOptions } from "@issue-tracker/orm";
import { ListCustomField } from "../../../data";

export interface CreateStatusFieldOptions extends ServiceOptions {
  listId: string;
}

export interface CreatePriorityFieldOptions extends ServiceOptions {
  listId: string;
}

export interface CreateFieldValueOptions extends ServiceOptions {
  id: string;
  value: string | string[] | null;
}

export interface UpdateStatusFieldOptions extends ServiceOptions {
  name: string;
  value: string;
}

export interface FindCustomFieldsOptions extends ServiceOptions {
  listId: string;
}

export interface CustomFieldService {
  createLookupField(): Promise<void>;
  createFieldValue(options: CreateFieldValueOptions): Promise<void>;
  updateStatusField(options: UpdateStatusFieldOptions): Promise<void>;
  findCustomFields(
    options: FindCustomFieldsOptions,
  ): Promise<ListCustomField[]>;
}
