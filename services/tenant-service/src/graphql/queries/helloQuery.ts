import { builder } from "@pine/server";

builder.queryFields((t) => ({
  tenantServiceHealth: t.string({
    resolve: () => "ok",
  }),
}));
