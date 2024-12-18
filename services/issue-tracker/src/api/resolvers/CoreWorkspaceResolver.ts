import { AppContext } from "@issue-tracker/server-core";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { container, postgres } from "../..";
import { WorkspaceResolver } from "./interfaces";
import { CreateWorkspaceInput, Workspace } from "./types";

@Resolver()
export class CoreWorkspaceResolver implements WorkspaceResolver {
  @Mutation(() => String)
  async createWorkspace(
    @Ctx() ctx: AppContext,
    @Arg("input") input: CreateWorkspaceInput,
  ) {
    const service = container.get("workspaceService");
    const userId = ctx.user.userId;

    return await postgres.transaction(async (manager) => {
      return await service.createWorkspace({ ...input, userId, manager });
    });
  }

  @Query(() => [Workspace])
  async findWorkspaces(@Ctx() ctx: AppContext) {
    const service = container.get("workspaceService");
    const userId = ctx.user.userId;

    return await postgres.transaction(async () => {
      return await service.findWorkspaces(userId);
    });
  }

  @Query(() => Workspace)
  async findDefaultWorkspace(@Ctx() ctx: AppContext) {
    const service = container.get("workspaceService");
    const userId = ctx.user.userId;

    return await postgres.transaction(async () => {
      return await service.findDefaultWorkspace(userId);
    });
  }
}
