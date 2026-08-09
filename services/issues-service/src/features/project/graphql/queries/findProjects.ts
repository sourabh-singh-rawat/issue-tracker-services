import { builder } from "@pine/server";
import { TYPES, container } from "@/bootstrap";
import { IProjectService } from "@/features/project";
import { PaginatedProjectObject } from "../objects/PaginatedProjectObject";

builder.queryFields((t) => ({
  findProjects: t.field({
    type: PaginatedProjectObject,
    resolve: async (_root, _args, ctx) => {
      const service = container.get<IProjectService>(TYPES.ProjectService);
      const userId = ctx.user!.id;
      return service.findProjects({ userId });
    },
  }),
}));
