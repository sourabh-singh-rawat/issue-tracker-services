import { builder } from "@pine/graphql-core";
import { TYPES, container, dataSource } from "@/bootstrap";
import { IWorkspaceService } from "@/features/workspace";
import { CreateWorkspaceInput } from "../inputs/create-workspace.input";

builder.mutationFields((t) => ({
  createWorkspace: t.string({
    args: {
      input: t.arg({ type: CreateWorkspaceInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);
      const userId = ctx.user!.userId;

      return await dataSource.transaction(async (manager) => {
        return await service.createWorkspace({
          name: input.name,
          id: input.id ?? undefined,
          description: input.description ?? undefined,
          userId,
          manager,
        });
      });
    },
  }),
}));
