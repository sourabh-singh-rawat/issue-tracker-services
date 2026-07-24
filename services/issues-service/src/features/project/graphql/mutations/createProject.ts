import { builder } from "@pine/graphql-core";
import { TYPES, container, dataSource } from "@/bootstrap";
import { IProjectService } from "@/features/project";
import { CreateProjectInput } from "../inputs/create-project.input";

builder.mutationFields((t) => ({
  createProject: t.string({
    args: {
      input: t.arg({ type: CreateProjectInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IProjectService>(TYPES.ProjectService);
      const userId = ctx.user!.userId;

      return await dataSource.transaction(async (manager) => {
        return await service.createProject({ manager, userId, ...input });
      });
    },
  }),
}));
