import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { container, postgres } from "../..";
import { ListResolver } from "./interfaces";
import { CreateListInput, List } from "./types";

@ObjectType()
export class PaginatedList {
  @Field(() => [List])
  rows!: List[];

  @Field()
  rowCount!: number;
}

@Resolver()
export class CoreListResolver implements ListResolver {
  @Mutation(() => String)
  async createList(@Ctx() ctx: any, @Arg("input") input: CreateListInput) {
    const service = container.get("listService");
    const userId = ctx.user.userId;

    return await postgres.transaction(async (manager) => {
      return await service.createList({ manager, userId, ...input });
    });
  }

  @Query(() => PaginatedList)
  async findLists(@Ctx() ctx: any) {
    const service = container.get("listService");
    const userId = ctx.user.userId;

    return await service.findLists({ userId });
  }

  @Query(() => List)
  async findList(@Ctx() ctx: any, @Arg("id") id: string) {
    const service = container.get("listService");
    const userId = ctx.user.userId;

    return await service.findList({ id, userId });
  }
}
