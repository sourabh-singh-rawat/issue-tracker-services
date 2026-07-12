import { ItemPriority } from "@issue-tracker/common";
import { builder } from "@issue-tracker/graphql-core";
import { container, dataSource } from "@/container";
import { CreateIssueInput } from "../inputs/create-issue.input";

builder.mutationFields((t) => ({
  createIssue: t.string({
    args: {
      input: t.arg({ type: CreateIssueInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get("issueService");

      return await dataSource.transaction(async (manager) => {
        return await service.createIssue({
          manager,
          userId,
          name: input.name,
          type: input.type,
          projectId: input.projectId,
          parentIssueId: input.parentIssueId ?? undefined,
          statusId: String(input.statusId),
          priority: input.priority as ItemPriority,
          dueDate: input.dueDate ?? undefined,
          description: input.description ?? undefined,
          assigneeIds: input.assigneeIds,
          estimate: input.estimate ?? undefined,
          component: input.component ?? undefined,
        });
      });
    },
  }),
}));
