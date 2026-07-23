import { builder } from "@pine/graphql-core";

import "@/graphql/queries/hello.query";
import "@/features/registration/graphql";

export const schema = builder.toSchema({});
