import SchemaBuilder from "@pothos/core";
import { GraphQLContext } from "./context";

export const builder = new SchemaBuilder<{
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
}>({});

builder.queryType({});
builder.mutationType({});
