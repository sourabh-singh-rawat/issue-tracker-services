import { builder } from "@pine/server";

import "@/graphql/queries/helloQuery";
import "@/features/tenants/graphql";
import "@/features/organizations/graphql";
import "@/features/platformRoles/graphql";
import "@/features/platformRoleAssignments/graphql";
import "@/features/capabilities/graphql";

export const schema = builder.toSchema({});
