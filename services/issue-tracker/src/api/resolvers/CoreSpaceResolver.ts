import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { container, postgres } from "../..";
import { SpaceResolver } from "./interfaces";
import { CreateSpaceInput, FindSpacesOptions, Space } from "./types";

@Resolver()
export class CoreSpaceResolver implements SpaceResolver {
  @Mutation(() => String)
  async createSpace(@Ctx() ctx: any, @Arg("input") input: CreateSpaceInput) {
    const service = container.get("spaceService");
    const userId = ctx.user.userId;

    return await postgres.transaction(async (manager) => {
      return await service.createSpace({ manager, ...input, userId });
    });
  }

  @Query(() => [Space])
  async findSpaces(@Ctx() ctx: any, @Arg("input") input: FindSpacesOptions) {
    const service = container.get("spaceService");
    const userId = ctx.user.userId;

    return await postgres.transaction(async (manager) => {
      return await service.findSpaces({ userId, ...input });
    });
  }
}
