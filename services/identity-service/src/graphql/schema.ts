import { builder } from "@pine/graphql-core";

import "@/graphql/queries/helloQuery";
import "@/graphql/mutations/helloMutation";

export const schema = builder.toSchema({});
