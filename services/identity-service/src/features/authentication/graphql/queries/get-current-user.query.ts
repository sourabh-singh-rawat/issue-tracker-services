import { builder } from "@pine/graphql-core";
import { container } from "@/container";
import { User } from "../objects/user.object";

builder.queryFields((t) => ({
  getCurrentUser: t.field({
    type: User,
    nullable: true,
    resolve: async (_root, _args, ctx) => {
      if (!ctx.user?.email) {
        return null;
      }

      const service = container.get("userProfileService");
      return await service.getUserProfileWithEmail(ctx.user.email);
    },
  }),
}));
