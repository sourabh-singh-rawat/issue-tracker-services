import { builder } from "@issue-tracker/graphql-core";

builder.mutationFields((t) => ({
  logout: t.string({
    resolve: async (_root, _args, ctx) => {
      ctx.rep.clearCookie("accessToken");
      ctx.rep.clearCookie("refreshToken");

      return "Logged out successfully";
    },
  }),
}));
