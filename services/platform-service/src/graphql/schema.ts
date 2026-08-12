import { builder } from "@pine/server";

import "@/graphql/queries/helloQuery";
import "@/features/tenants/graphql";
import "@/features/tenantRoles/graphql";
import "@/features/tenantMembers/graphql";
import "@/features/organizations/graphql";
import "@/features/organizationRoles/graphql";
import "@/features/platformRoles/graphql";
import "@/features/platformMembers/graphql";
import "@/features/capabilities/graphql";

export const schema = builder.toSchema({});
