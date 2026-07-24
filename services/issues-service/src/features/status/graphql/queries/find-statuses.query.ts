import { builder } from "@pine/graphql-core";
import { TYPES, container } from "@/bootstrap";
import { IStatusService } from "@/features/status";
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
      const service = container.get<IStatusService>(TYPES.StatusService);
      return await service.findStatuses({ projectId });
    },
  }),
}));
