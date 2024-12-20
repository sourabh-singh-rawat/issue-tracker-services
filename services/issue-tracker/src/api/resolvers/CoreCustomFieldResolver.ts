import { AppContext } from "@issue-tracker/server-core";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { container, postgres } from "../..";
import { CustomFieldResolver } from "./interfaces";
import { FindCustomFieldsOptions, ListCustomField } from "./types";

@Resolver()
export class CoreCustomFieldResolver implements CustomFieldResolver {
  @Query(() => [ListCustomField])
  async findCustomFields(
    @Ctx() ctx: AppContext,
    @Arg("options") options: FindCustomFieldsOptions,
  ) {
    const { listId } = options;
    const service = container.get("fieldService");

    return await postgres.transaction(async (manager) => {
      return await service.findCustomFields({ manager, listId });
    });
  }
}
