import type { CapabilityKey } from "./AllCapabilities";
import { ROLES } from "./Roles";

export const ROLE_MANAGEMENT = {
  READ: ROLES.READ.key,
  CREATE: ROLES.CREATE.key,
  UPDATE: ROLES.UPDATE.key,
  DELETE: ROLES.DELETE.key,
} as const satisfies Record<string, CapabilityKey>;

export const roleManagementCapabilities = (): readonly CapabilityKey[] => [
  ROLE_MANAGEMENT.READ,
  ROLE_MANAGEMENT.CREATE,
  ROLE_MANAGEMENT.UPDATE,
  ROLE_MANAGEMENT.DELETE,
];
