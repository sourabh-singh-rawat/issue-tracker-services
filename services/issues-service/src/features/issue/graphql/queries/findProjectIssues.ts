import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
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
      const userId = requireIdentityId(ctx);
      const service = container.get<IIssueService>(TYPES.IssueService);
      return await service.findProjectIssues({ userId, projectId });
    },
  }),
}));
