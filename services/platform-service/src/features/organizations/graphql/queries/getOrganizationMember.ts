import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { OrganizationMemberObject } from "@/features/organizations/graphql/objects/OrganizationMemberObject";
import type { IOrganizationMemberService } from "@/features/organizations/services";

builder.queryFields((t) => ({
  getOrganizationMember: t.field({
    type: OrganizationMemberObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IOrganizationMemberService>(TYPES.OrganizationMemberService);
      return service.getById(args.id, ctx.user!.id);
    },
  }),
}));
