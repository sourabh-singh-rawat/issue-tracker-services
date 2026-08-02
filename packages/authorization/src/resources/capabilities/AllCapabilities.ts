import type { ResourceDefinition } from "../ResourceDefinition";
import { CAPABILITIES } from "./Capabilities";
import { CAPABILITY_GRANTS } from "./CapabilityGrants";
import { ORGANIZATIONS } from "./Organizations";
import { PRODUCTS } from "./Products";
import { ROLES } from "./Roles";

export const ALL_CAPABILITIES = [
  CAPABILITIES.READ,
  CAPABILITIES.CREATE,
  CAPABILITIES.UPDATE,
  CAPABILITIES.DELETE,
  ROLES.READ,
  ROLES.CREATE,
  ROLES.UPDATE,
  ROLES.DELETE,
  CAPABILITY_GRANTS.READ,
  CAPABILITY_GRANTS.CREATE,
  CAPABILITY_GRANTS.UPDATE,
  CAPABILITY_GRANTS.DELETE,
  ORGANIZATIONS.READ,
  ORGANIZATIONS.CREATE,
  ORGANIZATIONS.UPDATE,
  ORGANIZATIONS.DELETE,
  PRODUCTS.READ,
  PRODUCTS.CREATE,
  PRODUCTS.UPDATE,
  PRODUCTS.DELETE,
] as const satisfies readonly ResourceDefinition[];

export type CapabilityKey = (typeof ALL_CAPABILITIES)[number]["key"];
