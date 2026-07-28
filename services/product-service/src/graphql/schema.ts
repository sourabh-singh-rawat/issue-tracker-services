import { builder } from "@pine/graphql-core";

import "@/graphql/queries/helloQuery";
import "@/features/brands/graphql";

export const schema = builder.toSchema({});
