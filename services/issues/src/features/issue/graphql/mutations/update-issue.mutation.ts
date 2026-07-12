import { ItemPriority } from "@issue-tracker/common";
import { builder } from "@issue-tracker/graphql-core";
import { container, dataSource } from "@/container";
import { UpdateIssueInput } from "../inputs/update-issue.input";

builder.mutationFields((t) => ({
  updateIssue: t.string({
    args: {
      input: t.arg({ type: UpdateIssueInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const userId = ctx.user!.userId;
      const service = container.get("issueService");
      const { issueId } = input;

      await dataSource.transaction(async (manager) => {
        return await service.updateIssue({
          manager,
          userId,
          issueId,
          name: input.name ?? undefined,
          type: input.type ?? undefined,
          statusId: input.statusId ?? undefined,
          priority: (input.priority as ItemPriority | null) ?? undefined,
          dueDate: input.dueDate ?? undefined,
          description: input.description ?? undefined,
          estimate: input.estimate ?? undefined,
          component: input.component ?? undefined,
        });
      });

      return "Updated successfully";
    },
  }),
}));
