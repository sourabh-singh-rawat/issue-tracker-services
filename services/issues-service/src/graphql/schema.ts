import { builder } from "@pine/server";

import "@/features/project/graphql";
import "@/features/issue/graphql";
import "@/features/status/graphql";

export const schema = builder.toSchema({});
