import { builder } from "@pine/graphql-core";

import "@/graphql/queries/helloQuery";
import "@/features/organizations/graphql";

export const schema = builder.toSchema({});
