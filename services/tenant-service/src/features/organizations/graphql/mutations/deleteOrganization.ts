import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import type { IOrganizationService } from "@/features/organizations/services";

builder.mutationFields((t) => ({
  deleteOrganization: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = getContainer().get<IOrganizationService>(TYPES.OrganizationService);
      await service.deleteOrganization(id, ctx.user!.id);
      return id;
    },
  }),
}));
