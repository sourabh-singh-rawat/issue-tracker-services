import { AppContext } from "@issue-tracker/server-core";
import { FieldOutput, FindFieldsOptions } from "../types";

export interface FieldResolver {
  findFields(
    ctx: AppContext,
    options: FindFieldsOptions,
  ): Promise<FieldOutput[]>;
}
