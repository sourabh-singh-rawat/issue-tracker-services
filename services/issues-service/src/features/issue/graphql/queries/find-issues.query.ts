import { builder } from "@pine/graphql-core";
import { TYPES, container } from "@/bootstrap";
import { IIssueService } from "@/features/issue";
import { FindIssuesInput } from "../inputs/find-issues.input";
import { Issue } from "../objects/issue.object";

builder.queryFields((t) => ({
  findIssue: t.field({
    type: Issue,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get<IIssueService>(TYPES.IssueService);
      return (await service.findIssue({ userId, issueId: id })) as any;
    },
  }),
  findProjectIssues: t.field({
    type: [Issue],
    args: {
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { projectId }, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get<IIssueService>(TYPES.IssueService);
      return (await service.findProjectIssues({ userId, projectId })) as any;
    },
  }),
  findSubIssues: t.field({
    type: [Issue],
    args: {
      input: t.arg({ type: FindIssuesInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const { parentIssueId } = input;
      const userId = ctx.user!.userId;
      const service = container.get<IIssueService>(TYPES.IssueService);
      return (await service.findSubIssues({ userId, parentIssueId })) as any;
    },
  }),
}));
