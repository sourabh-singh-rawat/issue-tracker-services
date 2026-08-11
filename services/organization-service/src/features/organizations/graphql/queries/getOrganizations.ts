import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { OrganizationObject } from "@/features/organizations/graphql/objects/OrganizationObject";
import type { IOrganizationService } from "@/features/organizations/services";

builder.queryFields((t) => ({
  getOrganizations: t.field({
    type: [OrganizationObject],
    resolve: async (_root, _args, ctx) => {
      const service = container.get<IOrganizationService>(TYPES.OrganizationService);
      return service.listOrganizations(ctx.user!.id);
    },
  }),
}));
