import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import type { IOrganizationService } from "@/features/organizations/services";

builder.mutationFields((t) => ({
  deleteOrganization: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IOrganizationService>(TYPES.OrganizationService);
      await service.deleteOrganization(id);
      return "Organization deleted successfully.";
    },
  }),
}));
