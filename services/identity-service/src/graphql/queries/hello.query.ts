import { builder } from "@pine/graphql-core";

const HelloType = builder.objectRef<{ message: string; message2: string }>("HelloXYZ");

HelloType.implement({
  fields: (t) => ({
    message: t.exposeString("message"),
    message2: t.exposeString("message2"),
  }),
});

builder.queryFields((t) => ({
  hello: t.field({
    type: HelloType,
    resolve: () => ({
      message: "Hello world",
      message2: "Hello world2",
    }),
  }),

  hello2: t.string({
    resolve: () => "Hello world",
  }),
}));
