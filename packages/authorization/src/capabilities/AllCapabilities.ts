import type { CapabilityDefinition } from "./CapabilityDefinition";
import { BRANDS } from "./Brands";
import { CAPABILITIES } from "./Capabilities";
import { CAPABILITY_GRANTS } from "./CapabilityGrants";
import { TENANTS } from "./Tenants";
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
  TENANTS.READ,
  TENANTS.CREATE,
  TENANTS.UPDATE,
  TENANTS.DELETE,
  ORGANIZATIONS.READ,
  ORGANIZATIONS.CREATE,
  ORGANIZATIONS.UPDATE,
  ORGANIZATIONS.DELETE,
  PRODUCTS.READ,
  PRODUCTS.CREATE,
  PRODUCTS.UPDATE,
  PRODUCTS.DELETE,
  BRANDS.READ,
  BRANDS.CREATE,
  BRANDS.UPDATE,
  BRANDS.DELETE,
] as const satisfies readonly CapabilityDefinition[];

export type CapabilityKey = (typeof ALL_CAPABILITIES)[number]["key"];
