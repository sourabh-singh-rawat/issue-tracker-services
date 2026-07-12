import { builder } from "@issue-tracker/graphql-core";
import { container } from "@/container";
import { Workspace } from "../objects/workspace.object";

builder.queryFields((t) => ({
  findWorkspaces: t.field({
    type: [Workspace],
    resolve: async (_root, _args, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get("workspaceService");
      return await service.findWorkspaces(userId);
    },
  }),
  findDefaultWorkspace: t.field({
    type: Workspace,
    resolve: async (_root, _args, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get("workspaceService");
      return await service.findDefaultWorkspace(userId);
    },
  }),
}));
