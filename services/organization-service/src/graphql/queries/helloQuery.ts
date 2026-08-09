import { builder } from "@pine/server";

builder.queryFields((t) => ({
  organizationServiceHealth: t.string({
    resolve: () => "ok",
  }),
}));
