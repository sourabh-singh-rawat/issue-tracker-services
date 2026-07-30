import { builder } from "@pine/graphql-core";

import "@/graphql/queries/helloQuery";
import "@/features/brands/graphql";
import "@/features/categories/graphql";
import "@/features/products/graphql";
import "@/features/units/graphql";

export const schema = builder.toSchema({});
