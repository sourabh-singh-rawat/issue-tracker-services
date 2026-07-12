import { builder } from "@issue-tracker/graphql-core";
import { container, dataSource } from "@/container";

builder.mutationFields((t) => ({
  deleteIssue: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get("issueService");

      await dataSource.transaction(async (manager) => {
        return await service.deleteIssue({ id, manager });
      });

      return "Deleted successfully";
    },
  }),
}));
