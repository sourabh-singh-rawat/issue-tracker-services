import { builder } from "@pine/graphql-core";

import "@/graphql/queries/helloQuery";
import "@/features/permissions/graphql";
import "@/features/roles/graphql";

export const schema = builder.toSchema({});
