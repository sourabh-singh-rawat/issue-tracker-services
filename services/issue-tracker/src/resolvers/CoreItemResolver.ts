import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { ItemResolver } from "./interfaces";
import { CreateItemInput, Item, UpdateItemInput } from "./types";
import { container, dataSource } from "..";

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
  async createItem(@Ctx() ctx: any, @Arg("input") input: CreateItemInput) {
    const userId = ctx.user.userId;
    const service = container.get("itemService");

    return await dataSource.transaction(async (manager) => {
      return await service.createItem({ manager, userId, ...input });
    });
  }

  @Query(() => PaginatedItem)
  async findItems(@Ctx() ctx: any) {
    const userId = ctx.user.userId;
    const service = container.get("itemService");

    return await service.findItems({ userId });
  }

  @Query(() => Item, { nullable: true })
  async findItem(@Ctx() ctx: any, @Arg("id") id: string) {
    const userId = ctx.user.userId;
    const service = container.get("itemService");

    return await service.findItem({ userId, itemId: id });
  }

  @Mutation(() => String)
  async updateItem(@Ctx() ctx: any, @Arg("input") input: UpdateItemInput) {
    const userId = ctx.user.userId;
    const service = container.get("itemService");
    const { itemId } = input;

    await dataSource.transaction(async (manager) => {
      return await service.updateItem({ ...input, userId, itemId, manager });
    });

    return "Updated successfully";
  }
}
