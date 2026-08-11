export type { ResourceDefinition } from "./resources";
export {
  BRAND,
  PRODUCT,
  TENANT,
  ORGANIZATION,
  ROLE,
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
  CAPABILITIES,
  CAPABILITY_GRANTS,
  ALL_CAPABILITIES,
} from "./capabilities";

export { type RoleDefinition, ALL_SYSTEM_ROLES, SYSTEM_ROLES, type SystemRoleKey } from "./roles";

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
  HttpAuthorizationClientOptions,
} from "./client";

export { InsufficientPermissionError } from "./errors";
