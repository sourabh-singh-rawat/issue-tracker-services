import { ItemPriority } from "@pine/common";
import { builder } from "@pine/graphql-core";
import { TYPES, container, dataSource } from "@/bootstrap";
import { IIssueService } from "@/features/issue";
import { CreateIssueInput } from "../inputs/CreateIssueInput";

builder.mutationFields((t) => ({
  createIssue: t.string({
    args: {
      input: t.arg({ type: CreateIssueInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get<IIssueService>(TYPES.IssueService);

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
