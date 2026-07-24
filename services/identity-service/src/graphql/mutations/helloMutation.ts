import { builder } from "@pine/graphql-core";

builder.mutationFields((t) => ({
  hello: t.string({
    resolve: () => "Hello world",
  }),
}));
