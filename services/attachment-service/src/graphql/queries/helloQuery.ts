import { builder } from "@pine/server";

builder.queryFields((t) => ({
  attachmentServiceHealth: t.string({
    resolve: () => "ok",
  }),
}));
