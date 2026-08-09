import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { CreateOrganizationInput } from "@/features/organizations/graphql/inputs/CreateOrganizationInput";
import { OrganizationObject } from "@/features/organizations/graphql/objects/OrganizationObject";
import type { IOrganizationService } from "@/features/organizations/services";

builder.mutationFields((t) => ({
  createOrganization: t.field({
    type: OrganizationObject,
    args: {
      input: t.arg({ type: CreateOrganizationInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IOrganizationService>(TYPES.OrganizationService);

      return service.createOrganization({
        name: input.name,
        slug: input.slug,
        description: input.description ?? undefined,
        isActive: input.isActive ?? undefined,
      });
    },
  }),
}));
