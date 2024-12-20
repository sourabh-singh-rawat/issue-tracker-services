import { AppContext } from "@issue-tracker/server-core";
import { FindCustomFieldsOptions, ListCustomField } from "../types";

export interface CustomFieldResolver {
  findCustomFields(
    ctx: AppContext,
    options: FindCustomFieldsOptions,
  ): Promise<ListCustomField[]>;
}
