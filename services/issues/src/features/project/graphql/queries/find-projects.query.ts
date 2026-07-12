import { builder } from "@issue-tracker/graphql-core";
import { container } from "@/container";
import { FindProjectsOptions } from "../inputs/find-projects.input";
import { PaginatedProject } from "../objects/paginated-project.object";
import { Project } from "../objects/project.object";

builder.queryFields((t) => ({
  findProjects: t.field({
    type: PaginatedProject,
    args: {
      input: t.arg({ type: FindProjectsOptions, required: false }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get("projectService");
      const userId = ctx.user!.userId;

      return await service.findProjects({
        userId,
        workspaceId: input?.workspaceId ?? undefined,
      });
    },
  }),
  findProject: t.field({
    type: Project,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get("projectService");
      const userId = ctx.user!.userId;

      return await service.findProject({ id, userId });
    },
  }),
}));
