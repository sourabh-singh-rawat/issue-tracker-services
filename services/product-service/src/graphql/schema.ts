import { builder } from "@pine/graphql-core";

import "@/graphql/queries/helloQuery";
import "@/features/brands/graphql";
import "@/features/products/graphql";

export const schema = builder.toSchema({});
