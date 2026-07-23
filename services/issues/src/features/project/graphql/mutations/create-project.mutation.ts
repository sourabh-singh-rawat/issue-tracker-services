import { builder } from "@pine/graphql-core";
import { container, dataSource } from "@/container";
import { CreateProjectInput } from "../inputs/create-project.input";

builder.mutationFields((t) => ({
  createProject: t.string({
    args: {
      input: t.arg({ type: CreateProjectInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get("projectService");
      const userId = ctx.user!.userId;

      return await dataSource.transaction(async (manager) => {
        return await service.createProject({ manager, userId, ...input });
      });
    },
  }),
}));
