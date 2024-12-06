import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { container, dataSource } from "../..";
import { WorkspaceResolver } from "./interfaces";
import { CreateWorkspaceInput, Workspace } from "./types";

@Resolver()
export class CoreWorkspaceResolver implements WorkspaceResolver {
  @Mutation(() => String)
  async createWorkspace(
    @Ctx() ctx: any,
    @Arg("input") input: CreateWorkspaceInput,
  ) {
    const service = container.get("workspaceService");
    const userId = ctx.user.userId;

    return await dataSource.transaction(async (manager) => {
      return await service.createWorkspace({ ...input, userId, manager });
    });
  }

  @Query(() => [Workspace])
  async findWorkspaces(@Ctx() ctx: any) {
    const service = container.get("workspaceService");
    const userId = ctx.user.userId;

    return await dataSource.transaction(async () => {
      return await service.findWorkspaces(userId);
    });
  }
}
