import SchemaBuilder from "@pothos/core";
import type { GraphQLContext } from "./context";

type SchemaTypes = {
  Context: GraphQLContext;
  Scalars: {
    DateTimeISO: {
      Input: Date;
      Output: Date;
    };
    EmailAddress: {
      Input: string;
      Output: string;
    };
    UUID: {
      Input: string;
      Output: string;
    };
  };
};

export const builder: InstanceType<typeof SchemaBuilder<SchemaTypes>> =
  new SchemaBuilder<SchemaTypes>({});

builder.queryType({});
builder.mutationType({});
