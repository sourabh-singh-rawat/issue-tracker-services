import { ServiceOptions } from "@issue-tracker/orm";
import { Field } from "../../../data";

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

export interface FindFieldsOptions extends ServiceOptions {
  listId: string;
}

export interface FieldService {
  createStatusField(options: CreateStatusFieldOptions): Promise<string>;
  createPriorityField(options: CreatePriorityFieldOptions): Promise<string>;
  createLookupField(): Promise<void>;
  createFieldValue(options: CreateFieldValueOptions): Promise<void>;
  updateStatusField(options: UpdateStatusFieldOptions): Promise<void>;
  findFields(options: FindFieldsOptions): Promise<Field[]>;
}
