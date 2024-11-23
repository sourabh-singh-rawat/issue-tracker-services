import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { WorkspaceResolver } from "./interfaces";
import { CreateWorkspaceInput, Workspace } from "./types";
import { container, dataSource } from "..";

@Resolver()
export class CoreWorkspaceResolver implements WorkspaceResolver {
  @Mutation(() => String)
  async createWorkspace(@Arg("input") input: CreateWorkspaceInput) {
    const service = container.get("workspaceService");

    return await dataSource.transaction(async (manager) => {
      return await service.createWorkspace({
        ...input,
        userId: "userId",
        manager,
      });
    });
  }

  @Query(() => [Workspace])
  async getAllWorkspaces(@Ctx() ctx: any) {
    const service = container.get("workspaceService");
    const { user } = ctx;
    const { userId } = user;

    return await dataSource.transaction(async () => {
      return await service.getAllWorkspaces(userId);
    });
  }
}
