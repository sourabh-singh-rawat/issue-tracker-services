import { builder } from "@pine/server";

import "@/features/identities/graphql";
import "@/features/tenants/graphql";
import "@/features/tenantRoles/graphql";
import "@/features/tenantMembers/graphql";
import "@/features/organizations/graphql";
import "@/features/organizationRoles/graphql";
import "@/features/platformRoles/graphql";
import "@/features/platformMembers/graphql";
import "@/graphql/objects/PermissionObject";

export const schema = builder.toSchema({});
