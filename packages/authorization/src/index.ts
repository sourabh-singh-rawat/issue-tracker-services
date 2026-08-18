export type { Resource, ResourceKey } from "./resources";
export { RESOURCES, isResource, parseResource, tryParseResource } from "./resources";

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
  permissionKey,
  parsePermission,
  tryParsePermission,
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

export type { GraphNamespace, GraphResource, GraphRelationship, GraphSubjectSet } from "./types";
export { GRAPH_NAMESPACES, isGraphNamespace } from "./types";

export { IDENTITY, PROFILE } from "./identities";
export {
  ADMIN,
  BRAND_PRODUCT,
  MEMBER,
  ORGANIZATION_TENANT,
  OWNER,
  PERMISSION_HAS,
  PLATFORM_OBJECT_ID,
  PLATFORM_TENANT,
  PRODUCT_ORGANIZATION,
  PROFILE_IDENTITY,
  ROLE_MEMBER,
  TENANT_PLATFORM,
  organizationOwnerRelationship,
  organizationTenantRelationship,
  platformAdminRelationship,
  platformMemberRelationship,
  platformTenantRelationship,
  profileIdentityRelationship,
  tenantAdminRelationship,
  tenantMemberRelationship,
  tenantOwnerRelationship,
  tenantPlatformRelationship,
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
  CheckRelationshipInput,
  CheckRelationshipResponse,
  EnsureRelationshipResponse,
  DeleteRelationshipResponse,
  HttpAuthorizationClientOptions,
  ListRelationshipsInput,
} from "./client";

export {
  InsufficientPermissionError,
  InvalidPermissionKeyError,
  InvalidResourceKeyError,
} from "./errors";
