import { ORGANIZATIONS, TENANTS, ROLES } from "../capabilities";
import { allCapabilityKeys, capabilityKeys, readCapabilityKeys, withoutActions } from "../utils";
import type { RoleDefinition } from "./RoleDefinition";

export const SYSTEM_ROLES = {
  SYSTEM_ADMINISTRATOR: {
    id: "01900000-0000-7000-8000-000000000001",
    key: "system.administrator",
    name: "System Administrator",
    description: "Full platform access — all authorization, tenant, and organization capabilities",
    capabilityKeys: allCapabilityKeys(),
  },
  TENANT_OWNER: {
    id: "01900000-0000-7000-8000-000000000002",
    key: "tenant.owner",
    name: "Tenant Owner",
    description: "Full control of a tenant and its organizations, including delete and role management",
    capabilityKeys: capabilityKeys(TENANTS, ORGANIZATIONS, ROLES),
  },
  TENANT_ADMINISTRATOR: {
    id: "01900000-0000-7000-8000-000000000003",
    key: "tenant.administrator",
    name: "Tenant Administrator",
    description: "Manage a tenant and its organizations without capability to delete them",
    capabilityKeys: [
      ...withoutActions(TENANTS, "delete"),
      ...withoutActions(ORGANIZATIONS, "delete"),
    ],
  },
  READ_ONLY: {
    id: "01900000-0000-7000-8000-000000000004",
    key: "system.read-only",
    name: "Read Only",
    description: "Read-only access across cataloged resources",
    capabilityKeys: readCapabilityKeys(),
  },
} as const satisfies Record<string, RoleDefinition>;

export const ALL_SYSTEM_ROLES: readonly RoleDefinition[] = [
  SYSTEM_ROLES.SYSTEM_ADMINISTRATOR,
  SYSTEM_ROLES.TENANT_OWNER,
  SYSTEM_ROLES.TENANT_ADMINISTRATOR,
  SYSTEM_ROLES.READ_ONLY,
];

export type SystemRoleKey = (typeof ALL_SYSTEM_ROLES)[number]["key"];
