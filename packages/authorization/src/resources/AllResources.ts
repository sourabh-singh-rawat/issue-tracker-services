import type { ResourceDefinition } from "./ResourceDefinition";
import { BRAND } from "./Brand";
import { CAPABILITY } from "./Capability";
import { CAPABILITY_GRANT } from "./CapabilityGrant";
import { ORGANIZATION } from "./Organization";
import { PRODUCT } from "./Product";
import { ROLE } from "./Role";

export const RESOURCES = {
  BRAND,
  PRODUCT,
  ORGANIZATION,
  ROLE,
  CAPABILITY,
  CAPABILITY_GRANT,
} as const satisfies Record<string, ResourceDefinition>;

export const ALL_RESOURCES: readonly ResourceDefinition[] = [
  RESOURCES.BRAND,
  RESOURCES.PRODUCT,
  RESOURCES.ORGANIZATION,
  RESOURCES.ROLE,
  RESOURCES.CAPABILITY,
  RESOURCES.CAPABILITY_GRANT,
];
