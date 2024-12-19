import { AppContext } from "@issue-tracker/server-core";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { container, postgres } from "../..";
import { FieldResolver } from "./interfaces";
import { FindFieldsOptions, ListCustomField } from "./types";

@Resolver()
export class CoreFieldResolver implements FieldResolver {
  @Query(() => [ListCustomField])
  async findCustomFields(
    @Ctx() ctx: AppContext,
    @Arg("options") options: FindFieldsOptions,
  ) {
    const { listId } = options;
    const service = container.get("fieldService");

    return await postgres.transaction(async (manager) => {
      return await service.findCustomFields({ manager, listId });
    });
  }
}
