import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { OrganizationObject } from "@/features/organizations/graphql/objects/OrganizationObject";
import type { IOrganizationService } from "@/features/organizations/services";

builder.queryFields((t) => ({
  getOrganizations: t.field({
    type: [OrganizationObject],
    resolve: async () => {
      const service = container.get<IOrganizationService>(TYPES.OrganizationService);
      return service.listOrganizations();
    },
  }),
}));
