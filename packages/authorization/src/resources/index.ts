export type { ResourceDefinition } from "./ResourceDefinition";
export type { Resource } from "./Resource";
export type { Relationship } from "./Relationship";
export {
  ORGANIZATION,
  type OrganizationRelation,
  ROLE,
  type RoleRelation,
  ALL_DYNAMIC_RESOURCES,
} from "./dynamic";
export { ALL_RESOURCES } from "./AllResources";
export {
  CAPABILITIES,
  ROLES,
  CAPABILITY_GRANTS,
  ORGANIZATIONS,
  PRODUCTS,
  ALL_CAPABILITIES,
  type CapabilityKey,
  ORGANIZATION_MANAGEMENT,
  ROLE_MANAGEMENT,
  CAPABILITY_MANAGEMENT,
  CAPABILITY_GRANT_MANAGEMENT,
  PRODUCT_MANAGEMENT,
  organizationManagementCapabilities,
  organizationManagementWithoutDeleteCapabilities,
  roleManagementCapabilities,
  capabilityManagementCapabilities,
  capabilityGrantManagementCapabilities,
  productManagementCapabilities,
} from "./capabilities";
