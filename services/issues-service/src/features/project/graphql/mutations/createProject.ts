import { builder } from "@pine/graphql-core";
import { TYPES, container } from "@/bootstrap";
import { IProjectService } from "@/features/project";
import { CreateProjectInput } from "../inputs/CreateProjectInput";

builder.mutationFields((t) => ({
  createProject: t.string({
    args: {
      input: t.arg({ type: CreateProjectInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IProjectService>(TYPES.ProjectService);
      const userId = ctx.user!.userId;
      return service.createProject({ userId, ...input });
    },
  }),
}));
