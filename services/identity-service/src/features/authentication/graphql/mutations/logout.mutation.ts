import { builder } from "@pine/graphql-core";

builder.mutationFields((t) => ({
  logout: t.string({
    resolve: async (_root, _args, ctx) => {
      ctx.rep.clearCookie("accessToken");
      // Clear any legacy refreshToken cookies from older clients
      ctx.rep.clearCookie("refreshToken");

      return "Logged out successfully";
    },
  }),
}));
