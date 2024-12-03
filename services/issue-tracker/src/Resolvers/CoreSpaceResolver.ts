import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SpaceResolver } from "./Interfaces";
import { CreateSpaceInput, FindSpacesOptions, Space } from "./Types";
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

  @Query(() => [Space])
  async findSpaces(@Ctx() ctx: any, @Arg("input") input: FindSpacesOptions) {
    const service = container.get("spaceService");
    const userId = ctx.user.userId;

    return await dataSource.transaction(async (manager) => {
      return await service.findSpaces({ userId, ...input });
    });
  }
}
