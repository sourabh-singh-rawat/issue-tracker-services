import { ALL_ORGANIZATION_ROLES } from "./OrganizationRoles";
import { ALL_PLATFORM_ROLES } from "./PlatformRoles";
import { ALL_TENANT_ROLES } from "./TenantRoles";
import type { RoleDefinition } from "./RoleDefinition";

export const ALL_SYSTEM_ROLES: readonly RoleDefinition[] = [
  ...ALL_PLATFORM_ROLES,
  ...ALL_TENANT_ROLES,
  ...ALL_ORGANIZATION_ROLES,
];
