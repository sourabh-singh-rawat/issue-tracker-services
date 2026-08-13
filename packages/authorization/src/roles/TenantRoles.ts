import {
  CAPABILITY_GRANTS,
  ORGANIZATIONS,
  ROLES,
  TENANTS,
} from "../capabilities";
import { capabilityKeys, withoutActions } from "../utils";
import type { RoleDefinition } from "./RoleDefinition";

export const TENANT_ROLES = {
  TENANT_OWNER: {
    id: "01900000-0000-7000-8000-000000000005",
    key: "tenant.owner",
    name: "Tenant Owner",
    description:
      "Full control of a tenant, including organizations, roles, grants, and membership",
    capabilityKeys: capabilityKeys(
      withoutActions(TENANTS, "create"),
      ORGANIZATIONS,
      ROLES,
      CAPABILITY_GRANTS,
    ),
  },
  TENANT_ADMIN: {
    id: "01900000-0000-7000-8000-000000000006",
    key: "tenant.admin",
    name: "Tenant Admin",
    description:
      "Manages tenant settings, membership, organizations, and grants without suspending the tenant or defining roles",
    capabilityKeys: capabilityKeys(
      withoutActions(TENANTS, "create", "suspend"),
      withoutActions(ORGANIZATIONS, "delete"),
      [ROLES.READ.key],
      CAPABILITY_GRANTS,
    ),
  },
  TENANT_MEMBER: {
    id: "01900000-0000-7000-8000-000000000007",
    key: "tenant.member",
    name: "Tenant Member",
    description: "Read access to tenant resources, organizations, and roles",
    capabilityKeys: capabilityKeys([
      TENANTS.READ.key,
      ORGANIZATIONS.READ.key,
      ROLES.READ.key,
    ]),
  },
} as const satisfies Record<string, RoleDefinition>;

export const ALL_TENANT_ROLES: readonly RoleDefinition[] = [
  TENANT_ROLES.TENANT_OWNER,
  TENANT_ROLES.TENANT_ADMIN,
  TENANT_ROLES.TENANT_MEMBER,
];

export type TenantRoleKey = (typeof ALL_TENANT_ROLES)[number]["key"];
