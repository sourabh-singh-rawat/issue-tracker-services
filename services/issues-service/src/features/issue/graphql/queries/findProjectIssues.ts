import { builder } from "@pine/graphql-core";
import { TYPES, container } from "@/bootstrap";
import { IIssueService } from "@/features/issue";
import { IssueObject } from "../objects/IssueObject";

builder.queryFields((t) => ({
  findProjectIssues: t.field({
    type: [IssueObject],
    args: {
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { projectId }, ctx) => {
      const userId = ctx.user!.id;
      const service = container.get<IIssueService>(TYPES.IssueService);
      return await service.findProjectIssues({ userId, projectId });
    },
  }),
}));
