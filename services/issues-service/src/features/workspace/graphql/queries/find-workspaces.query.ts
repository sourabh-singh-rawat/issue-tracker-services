import { builder } from "@pine/graphql-core";
import { TYPES, container } from "@/bootstrap";
import { IWorkspaceService } from "@/features/workspace";
import { WorkspaceObject } from "../objects/WorkspaceObject";

builder.queryFields((t) => ({
  findWorkspaces: t.field({
    type: [WorkspaceObject],
    resolve: async (_root, _args, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);
      return await service.findWorkspaces(userId);
    },
  }),
  findDefaultWorkspace: t.field({
    type: WorkspaceObject,
    resolve: async (_root, _args, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);
      return await service.findDefaultWorkspace(userId);
    },
  }),
}));
