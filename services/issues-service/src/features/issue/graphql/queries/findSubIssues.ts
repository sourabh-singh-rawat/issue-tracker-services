import { builder } from "@pine/server";
import { TYPES, container } from "@/bootstrap";
import { IIssueService } from "@/features/issue";
import { FindIssuesInput } from "../inputs/FindIssuesInput";
import { IssueObject } from "../objects/IssueObject";

builder.queryFields((t) => ({
  findSubIssues: t.field({
    type: [IssueObject],
    args: {
      input: t.arg({ type: FindIssuesInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const { parentIssueId } = input;
      const userId = ctx.user!.id;
      const service = container.get<IIssueService>(TYPES.IssueService);
      return await service.findSubIssues({ userId, parentIssueId });
    },
  }),
}));
