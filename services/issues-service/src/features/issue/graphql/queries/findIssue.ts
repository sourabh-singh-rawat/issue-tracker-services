import { builder } from "@pine/server";
import { TYPES, container } from "@/bootstrap";
import { IIssueService } from "@/features/issue";
import { IssueObject } from "../objects/IssueObject";

builder.queryFields((t) => ({
  findIssue: t.field({
    type: IssueObject,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const userId = ctx.user!.id;
      const service = container.get<IIssueService>(TYPES.IssueService);
      return await service.findIssue({ userId, issueId: id });
    },
  }),
}));
