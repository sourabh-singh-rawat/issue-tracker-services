import { builder } from "@issue-tracker/graphql-core";

import "@/features/workspace/graphql";
import "@/features/project/graphql";
import "@/features/issue/graphql";
import "@/features/status/graphql";

export const schema = builder.toSchema({});
