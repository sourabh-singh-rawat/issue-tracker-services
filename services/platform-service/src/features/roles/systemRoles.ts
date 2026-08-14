import {
  ALL_ORGANIZATION_ROLES,
  ALL_PLATFORM_ROLES,
  ALL_TENANT_ROLES,
  findOrganizationRoleDefinition,
  findPlatformRoleDefinition,
  findTenantRoleDefinition,
  type RoleDefinition,
} from "@pine/authorization";
import type { OrganizationRole, PlatformRole, TenantRole } from "@/db";

const SYSTEM_ROLE_CREATED_AT = new Date(0);

const toRoleFields = (definition: RoleDefinition) => ({
  id: definition.id,
  key: definition.key,
  name: definition.name,
  description: definition.description,
  isSystem: true,
  createdAt: SYSTEM_ROLE_CREATED_AT,
  updatedAt: null,
  deletedAt: null,
  version: 1,
});

export const toPlatformSystemRole = (definition: RoleDefinition): PlatformRole =>
  toRoleFields(definition);

export const toTenantSystemRole = (
  definition: RoleDefinition,
  tenantId: string,
): TenantRole => ({
  ...toRoleFields(definition),
  tenantId,
});

export const toOrganizationSystemRole = (
  definition: RoleDefinition,
  organizationId: string,
): OrganizationRole => ({
  ...toRoleFields(definition),
  organizationId,
});

export const platformSystemRoles = (): PlatformRole[] =>
  ALL_PLATFORM_ROLES.map(toPlatformSystemRole);

export const tenantSystemRoles = (tenantId: string): TenantRole[] =>
  ALL_TENANT_ROLES.map((definition) => toTenantSystemRole(definition, tenantId));

export const organizationSystemRoles = (organizationId: string): OrganizationRole[] =>
  ALL_ORGANIZATION_ROLES.map((definition) =>
    toOrganizationSystemRole(definition, organizationId),
  );

export const isCatalogRole = (role: { id: string; key: string }): boolean =>
  findPlatformRoleDefinition(role) != null ||
  findTenantRoleDefinition(role) != null ||
  findOrganizationRoleDefinition(role) != null;

export const isCustomStoredRole = (role: { id: string; key: string; isSystem: boolean }): boolean =>
  !role.isSystem && !isCatalogRole(role);
