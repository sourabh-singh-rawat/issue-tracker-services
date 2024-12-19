import { AppContext } from "@issue-tracker/server-core";
import { FindFieldsOptions, ListCustomField } from "../types";

export interface FieldResolver {
  findCustomFields(
    ctx: AppContext,
    options: FindFieldsOptions,
  ): Promise<ListCustomField[]>;
}
