import type { CapabilityKey } from "./AllCapabilities";
import { CAPABILITY_GRANTS } from "./CapabilityGrants";

export const CAPABILITY_GRANT_MANAGEMENT = {
  READ: CAPABILITY_GRANTS.READ.key,
  CREATE: CAPABILITY_GRANTS.CREATE.key,
  UPDATE: CAPABILITY_GRANTS.UPDATE.key,
  DELETE: CAPABILITY_GRANTS.DELETE.key,
} as const satisfies Record<string, CapabilityKey>;

export const capabilityGrantManagementCapabilities = (): readonly CapabilityKey[] => [
  CAPABILITY_GRANT_MANAGEMENT.READ,
  CAPABILITY_GRANT_MANAGEMENT.CREATE,
  CAPABILITY_GRANT_MANAGEMENT.UPDATE,
  CAPABILITY_GRANT_MANAGEMENT.DELETE,
];
