import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { OrganizationMemberObject } from "@/features/organizations/graphql/objects/OrganizationMemberObject";
import type { IOrganizationMemberService } from "@/features/organizations/services";

builder.queryFields((t) => ({
  getOrganizationMembers: t.field({
    type: [OrganizationMemberObject],
    args: {
      organizationId: t.arg.string({ required: true }),
      relation: t.arg.string({ required: false }),
      identityId: t.arg.string({ required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IOrganizationMemberService>(TYPES.OrganizationMemberService);
      return service.list(
        {
          organizationId: args.organizationId,
          relation: args.relation ?? undefined,
          identityId: args.identityId ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
