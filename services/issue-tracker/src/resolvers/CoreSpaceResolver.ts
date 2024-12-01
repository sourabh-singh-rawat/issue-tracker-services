import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { SpaceResolver } from "./interfaces";
import { CreateSpaceInput } from "./types";
import { container, dataSource } from "..";

@Resolver()
export class CoreSpaceResolver implements SpaceResolver {
  @Mutation(() => String)
  async createSpace(@Ctx() ctx: any, @Arg("input") input: CreateSpaceInput) {
    const service = container.get("spaceService");
    const userId = ctx.user.userId;

    return await dataSource.transaction(async (manager) => {
      return await service.createSpace({ manager, ...input, userId });
    });
  }
}
