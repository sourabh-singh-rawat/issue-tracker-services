import { builder } from "@pine/graphql-core";
import { container } from "@/container";
import { FindStatusesOptions } from "../inputs/find-statuses.input";
import { Status } from "../objects/status.object";

builder.queryFields((t) => ({
  findStatuses: t.field({
    type: [Status],
    args: {
      input: t.arg({ type: FindStatusesOptions, required: true }),
    },
    resolve: async (_root, { input }) => {
      const { projectId } = input;
      const service = container.get("statusService");
      return await service.findStatuses({ projectId });
    },
  }),
}));
