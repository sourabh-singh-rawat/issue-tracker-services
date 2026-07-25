import { builder } from "@pine/graphql-core";
import { TYPES, container } from "@/bootstrap";
import { IIssueService } from "@/features/issue";
import { FindIssuesInput } from "../inputs/FindIssuesInput";
import { IssueObject } from "../objects/IssueObject";

builder.queryFields((t) => ({
  findIssue: t.field({
    type: IssueObject,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get<IIssueService>(TYPES.IssueService);
      return await service.findIssue({ userId, issueId: id });
    },
  }),
  findProjectIssues: t.field({
    type: [IssueObject],
    args: {
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { projectId }, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get<IIssueService>(TYPES.IssueService);
      return await service.findProjectIssues({ userId, projectId });
    },
  }),
  findSubIssues: t.field({
    type: [IssueObject],
    args: {
      input: t.arg({ type: FindIssuesInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const { parentIssueId } = input;
      const userId = ctx.user!.userId;
      const service = container.get<IIssueService>(TYPES.IssueService);
      return await service.findSubIssues({ userId, parentIssueId });
    },
  }),
}));
