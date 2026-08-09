import { builder } from "@pine/server";

import "@/graphql/queries/helloQuery";
import "@/features/organizations/graphql";

export const schema = builder.toSchema({});
