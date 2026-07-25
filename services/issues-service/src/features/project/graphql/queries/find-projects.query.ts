import { builder } from "@pine/graphql-core";
import { TYPES, container } from "@/bootstrap";
import { IProjectService } from "@/features/project";
import { FindProjectsOptions } from "../inputs/FindProjectsOptions";
import { PaginatedProjectObject } from "../objects/PaginatedProjectObject";
import { ProjectObject } from "../objects/ProjectObject";

builder.queryFields((t) => ({
  findProjects: t.field({
    type: PaginatedProjectObject,
    args: {
      input: t.arg({ type: FindProjectsOptions, required: false }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IProjectService>(TYPES.ProjectService);
      const userId = ctx.user!.userId;

      return await service.findProjects({
        userId,
        workspaceId: input?.workspaceId ?? undefined,
      });
    },
  }),
  findProject: t.field({
    type: ProjectObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IProjectService>(TYPES.ProjectService);
      const userId = ctx.user!.userId;

      return await service.findProject({ id, userId });
    },
  }),
}));
