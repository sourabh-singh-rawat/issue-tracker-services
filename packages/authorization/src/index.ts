export type { ResourceDefinition } from "./resources";
export {
  BRAND,
  PRODUCT,
  TENANT,
  ORGANIZATION,
  ROLE,
  PLATFORM_ROLE as PLATFORM_ROLE_RESOURCE,
  PLATFORM_MEMBER as PLATFORM_MEMBER_RESOURCE,
  CAPABILITY,
  CAPABILITY_GRANT,
  RESOURCES,
  ALL_RESOURCES,
} from "./resources";

export type { CapabilityDefinition, CapabilityKey } from "./capabilities";
export {
  defineCapability,
  BRANDS,
  PRODUCTS,
  TENANTS,
  ORGANIZATIONS,
  ROLES,
  PLATFORM_ROLE,
  PLATFORM_MEMBER,
  CAPABILITY_GRANTS,
  ALL_CAPABILITIES,
} from "./capabilities";

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
  platformRoleCapabilityKeys,
  tenantRoleCapabilityKeys,
  organizationRoleCapabilityKeys,
  systemRoleCapabilityKeys,
} from "./roles";

export type { GraphResource, GraphRelationship, GraphSubjectSet } from "./types";

export { USER } from "./identities";
export { CAPABILITY_HAS, ROLE_ASSIGNEE } from "./relations";

export {
  capabilityKeys,
  withoutActions,
  allCapabilityKeys,
  readCapabilityKeys,
} from "./utils";

export type { IAuthorizationClient } from "./client";
export { HttpAuthorizationClient, requireCapability } from "./client";
export type {
  CheckRelationshipInput,
  CheckRelationshipResponse,
  EnsureRelationshipResponse,
  DeleteRelationshipResponse,
  HttpAuthorizationClientOptions,
} from "./client";

export { InsufficientPermissionError } from "./errors";
