import { AppContext } from "@issue-tracker/server-core";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { container, postgres } from "../..";
import { ViewResolver } from "./interfaces";
import { View } from "./types";

@Resolver()
export class CoreViewResolver implements ViewResolver {
  @Query(() => [View])
  async findViews(@Ctx() ctx: AppContext, @Arg("listId") listId: string) {
    const userId = ctx.user.userId;
    const service = container.get("viewService");

    return await postgres.transaction(async (manager) => {
      return await service.findViews({ manager, listId, userId });
    });
  }

  @Query(() => View)
  async findView(@Ctx() ctx: AppContext, @Arg("viewId") viewId: string) {
    const service = container.get("viewService");

    return await service.findView(viewId);
  }
}
