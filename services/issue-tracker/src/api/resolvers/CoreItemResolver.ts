import { AppContext } from "@issue-tracker/server-core";
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
import { ItemResolver } from "./interfaces";
import {
  CreateItemInput,
  FindItemsInput,
  Item,
  UpdateItemInput,
} from "./types";

@ObjectType()
export class PaginatedItem {
  @Field(() => [Item])
  rows!: Item[];

  @Field()
  rowCount!: number;
}

@Resolver()
export class CoreItemResolver implements ItemResolver {
  @Mutation(() => String)
  async createItem(
    @Ctx() ctx: AppContext,
    @Arg("input") input: CreateItemInput,
  ) {
    const userId = ctx.user.userId;
    const service = container.get("itemService");

    return await postgres.transaction(async (manager) => {
      return await service.createItem({ manager, userId, ...input });
    });
  }

  @Query(() => Item, { nullable: true })
  async findItem(@Ctx() ctx: AppContext, @Arg("id") id: string) {
    const userId = ctx.user.userId;
    const service = container.get("itemService");

    return await service.findItem({ userId, itemId: id });
  }

  @Query(() => [Item])
  async findListItems(@Ctx() ctx: AppContext, @Arg("listId") listId: string) {
    const userId = ctx.user.userId;
    const service = container.get("itemService");

    return await service.findListItems({ userId, listId });
  }

  @Query(() => [Item])
  async findSubItems(
    @Ctx() ctx: AppContext,
    @Arg("input") input: FindItemsInput,
  ) {
    const { parentItemId } = input;
    const userId = ctx.user.userId;
    const service = container.get("itemService");

    return await service.findSubItems({ userId, parentItemId });
  }

  @Mutation(() => String)
  async updateItem(
    @Ctx() ctx: AppContext,
    @Arg("input") input: UpdateItemInput,
  ) {
    const userId = ctx.user.userId;
    const service = container.get("itemService");
    const { itemId } = input;

    await postgres.transaction(async (manager) => {
      return await service.updateItem({ ...input, userId, itemId, manager });
    });

    return "Updated successfully";
  }

  @Mutation(() => String)
  async deleteItem(@Ctx() ctx: AppContext, id: string) {
    const userId = ctx.user.userId;
    const service = container.get("itemService");

    await postgres.transaction(async (manager) => {
      return await service.deleteItem({ id, manager });
    });

    return "Deleted successfully";
  }
}
