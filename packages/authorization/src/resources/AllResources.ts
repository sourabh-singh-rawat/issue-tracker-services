import type { ResourceDefinition } from "./ResourceDefinition";
import { BRAND } from "./Brand";
import { PERMISSION } from "./Permission";
import { PERMISSION_GRANT } from "./PermissionGrant";
import { TENANT } from "./Tenant";
import { PLATFORM } from "./Platform";
import { ORGANIZATION } from "./Organization";
import { PLATFORM_ROLE } from "./PlatformRole";
import { PLATFORM_MEMBER } from "./PlatformMember";
import { PRODUCT } from "./Product";
import { ROLE } from "./Role";

export const RESOURCES = {
  BRAND,
  PRODUCT,
  TENANT,
  PLATFORM,
  ORGANIZATION,
  ROLE,
  PLATFORM_ROLE,
  PLATFORM_MEMBER,
  PERMISSION,
  PERMISSION_GRANT,
} as const satisfies Record<string, ResourceDefinition>;

export const ALL_RESOURCES: readonly ResourceDefinition[] = [
  RESOURCES.BRAND,
  RESOURCES.PRODUCT,
  RESOURCES.TENANT,
  RESOURCES.PLATFORM,
  RESOURCES.ORGANIZATION,
  RESOURCES.ROLE,
  RESOURCES.PLATFORM_ROLE,
  RESOURCES.PLATFORM_MEMBER,
  RESOURCES.PERMISSION,
  RESOURCES.PERMISSION_GRANT,
];
