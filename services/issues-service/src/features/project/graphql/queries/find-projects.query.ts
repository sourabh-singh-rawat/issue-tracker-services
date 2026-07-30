import { builder } from "@pine/graphql-core";
import { TYPES, container } from "@/bootstrap";
import { IProjectService } from "@/features/project";
import { PaginatedProjectObject } from "../objects/PaginatedProjectObject";
import { ProjectObject } from "../objects/ProjectObject";

builder.queryFields((t) => ({
  findProjects: t.field({
    type: PaginatedProjectObject,
    resolve: async (_root, _args, ctx) => {
      const service = container.get<IProjectService>(TYPES.ProjectService);
      const userId = ctx.user!.userId;
      return service.findProjects({ userId });
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
      return service.findProject({ id, userId });
    },
  }),
}));
