import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { container } from "../..";
import { StatusResolver } from "./interfaces";
import { FindStatusesOptions, Status } from "./types";

@Resolver()
export class CoreStatusResolver implements StatusResolver {
  @Query(() => [Status])
  async findStatuses(
    @Ctx() ctx: any,
    @Arg("input") input: FindStatusesOptions,
  ) {
    const { spaceId } = input;
    const service = container.get("statusService");

    return await service.findStatuses({ spaceId });
  }
}
