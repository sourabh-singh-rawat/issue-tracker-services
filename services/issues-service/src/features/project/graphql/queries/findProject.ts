import { builder } from "@pine/server";
import { TYPES, container } from "@/bootstrap";
import { IProjectService } from "@/features/project";
import { ProjectObject } from "../objects/ProjectObject";

builder.queryFields((t) => ({
  findProject: t.field({
    type: ProjectObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IProjectService>(TYPES.ProjectService);
      const userId = ctx.user!.id;
      return service.findProject({ id, userId });
    },
  }),
}));
