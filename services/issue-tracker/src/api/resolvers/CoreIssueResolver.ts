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
import { IssueResolver } from "./interfaces";
import {
  CreateIssueInput,
  FindIssuesInput,
  Issue,
  UpdateIssueInput,
} from "./types";

@ObjectType()
export class PaginatedIssue {
  @Field(() => [Issue])
  rows!: Issue[];

  @Field()
  rowCount!: number;
}

@Resolver()
export class CoreIssueResolver implements IssueResolver {
  @Mutation(() => String)
  async createIssue(
    @Ctx() ctx: AppContext,
    @Arg("input") input: CreateIssueInput,
  ) {
    const userId = ctx.user.userId;
    const service = container.get("issueService");

    return await postgres.transaction(async (manager) => {
      return await service.createIssue({ manager, userId, ...input });
    });
  }

  @Query(() => Issue, { nullable: true })
  async findIssue(@Ctx() ctx: AppContext, @Arg("id") id: string) {
    const userId = ctx.user.userId;
    const service = container.get("issueService");

    return await service.findIssue({ userId, issueId: id });
  }

  @Query(() => [Issue])
  async findProjectIssues(
    @Ctx() ctx: AppContext,
    @Arg("projectId") projectId: string,
  ) {
    const userId = ctx.user.userId;
    const service = container.get("issueService");

    return await service.findProjectIssues({ userId, projectId });
  }

  @Query(() => [Issue])
  async findSubIssues(
    @Ctx() ctx: AppContext,
    @Arg("input") input: FindIssuesInput,
  ) {
    const { parentIssueId } = input;
    const userId = ctx.user.userId;
    const service = container.get("issueService");

    return await service.findSubIssues({ userId, parentIssueId });
  }

  @Mutation(() => String)
  async updateIssue(
    @Ctx() ctx: AppContext,
    @Arg("input") input: UpdateIssueInput,
  ) {
    const userId = ctx.user.userId;
    const service = container.get("issueService");
    const { issueId } = input;

    await postgres.transaction(async (manager) => {
      return await service.updateIssue({ ...input, userId, issueId, manager });
    });

    return "Updated successfully";
  }

  @Mutation(() => String)
  async deleteIssue(@Ctx() ctx: AppContext, id: string) {
    const userId = ctx.user.userId;
    const service = container.get("issueService");

    await postgres.transaction(async (manager) => {
      return await service.deleteIssue({ id, manager });
    });

    return "Deleted successfully";
  }
}
