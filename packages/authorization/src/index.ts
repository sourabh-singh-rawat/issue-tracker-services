export type { ResourceDefinition } from "./resources";
export {
  BRAND,
  PRODUCT,
  TENANT,
  PLATFORM as PLATFORM_RESOURCE,
  ORGANIZATION,
  ROLE,
  PLATFORM_ROLE as PLATFORM_ROLE_RESOURCE,
  PLATFORM_MEMBER as PLATFORM_MEMBER_RESOURCE,
  PERMISSION,
  PERMISSION_GRANT,
  RESOURCES,
  ALL_RESOURCES,
} from "./resources";

export type {
  Permission,
  PermissionKey,
  PlatformPermission,
  TenantPermission,
  OrganizationPermission,
  ProductPermission,
  BrandPermission,
  RolePermission,
  PermissionGrantPermission,
} from "./permissions";
export {
  definePermissions,
  permissionKey,
  parsePermission,
  PLATFORM_PERMISSIONS,
  TENANT_PERMISSIONS,
  ORGANIZATION_PERMISSIONS,
  PRODUCT_PERMISSIONS,
  BRAND_PERMISSIONS,
  ROLE_PERMISSIONS,
  PERMISSION_GRANT_PERMISSIONS,
  ALL_PERMISSIONS,
} from "./permissions";

export {
  type RoleDefinition,
  ALL_PLATFORM_ROLES,
  PLATFORM_ROLES,
  type PlatformRoleKey,
  ALL_TENANT_ROLES,
  TENANT_ROLES,
  type TenantRoleKey,
  ALL_ORGANIZATION_ROLES,
  ORGANIZATION_ROLES,
  type OrganizationRoleKey,
  ALL_SYSTEM_ROLES,
  findPlatformRoleDefinition,
  findTenantRoleDefinition,
  findOrganizationRoleDefinition,
  findSystemRoleDefinition,
  platformRolePermissionKeys,
  tenantRolePermissionKeys,
  organizationRolePermissionKeys,
  systemRolePermissionKeys,
} from "./roles";

export type { GraphResource, GraphRelationship, GraphSubjectSet } from "./types";

export { IDENTITY } from "./identities";
export {
  PERMISSION_HAS,
  ROLE_MEMBER,
  PLATFORM_TENANT,
  TENANT_PLATFORM,
} from "./relations";

export {
  permissionKeys,
  withoutActions,
  allPermissionKeys,
  readPermissionKeys,
} from "./utils";

export type { IAuthorizationClient } from "./client";
export { HttpAuthorizationClient, requirePermission } from "./client";
export type {
  ResourceReference,
  CheckRelationshipInput,
  CheckRelationshipResponse,
  EnsureRelationshipResponse,
  DeleteRelationshipResponse,
  HttpAuthorizationClientOptions,
} from "./client";

export { InsufficientPermissionError, InvalidPermissionKeyError } from "./errors";
