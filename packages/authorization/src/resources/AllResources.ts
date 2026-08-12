import type { ResourceDefinition } from "./ResourceDefinition";
import { BRAND } from "./Brand";
import { CAPABILITY } from "./Capability";
import { CAPABILITY_GRANT } from "./CapabilityGrant";
import { TENANT } from "./Tenant";
import { ORGANIZATION } from "./Organization";
import { PLATFORM_ROLE } from "./PlatformRole";
import { PLATFORM_MEMBER } from "./PlatformMember";
import { PRODUCT } from "./Product";
import { ROLE } from "./Role";

export const RESOURCES = {
  BRAND,
  PRODUCT,
  TENANT,
  ORGANIZATION,
  ROLE,
  PLATFORM_ROLE,
  PLATFORM_MEMBER,
  CAPABILITY,
  CAPABILITY_GRANT,
} as const satisfies Record<string, ResourceDefinition>;

export const ALL_RESOURCES: readonly ResourceDefinition[] = [
  RESOURCES.BRAND,
  RESOURCES.PRODUCT,
  RESOURCES.TENANT,
  RESOURCES.ORGANIZATION,
  RESOURCES.ROLE,
  RESOURCES.PLATFORM_ROLE,
  RESOURCES.PLATFORM_MEMBER,
  RESOURCES.CAPABILITY,
  RESOURCES.CAPABILITY_GRANT,
];
