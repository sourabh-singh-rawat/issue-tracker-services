import { AppContext } from "@issue-tracker/server-core";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { container, dataSource } from "../..";
import { FieldResolver } from "./interfaces";
import { FieldOutput, FindFieldsOptions } from "./types";

@Resolver()
export class CoreFieldResolver implements FieldResolver {
  @Query(() => [FieldOutput])
  async findFields(
    @Ctx() ctx: AppContext,
    @Arg("options") options: FindFieldsOptions,
  ) {
    const { listId } = options;
    const service = container.get("fieldService");

    return await dataSource.transaction(async (manager) => {
      return await service.findFields({ manager, listId });
    });
  }
}
