import { builder } from "@pine/graphql-core";

import "@/graphql/queries/helloQuery";
import "@/graphql/mutations/helloMutation";
import "@/features/admin/graphql";
import "@/features/clients/graphql";

export const schema = builder.toSchema({});
