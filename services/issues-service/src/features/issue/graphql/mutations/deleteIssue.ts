import { builder } from "@pine/graphql-core";
import { TYPES, container, dataSource } from "@/bootstrap";
import { IIssueService } from "@/features/issue";

builder.mutationFields((t) => ({
  deleteIssue: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IIssueService>(TYPES.IssueService);

      await dataSource.transaction(async (manager) => {
        return await service.deleteIssue({ id, manager });
      });

      return "Deleted successfully";
    },
  }),
}));
