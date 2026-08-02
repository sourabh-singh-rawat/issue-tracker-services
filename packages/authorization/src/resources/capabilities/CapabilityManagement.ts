import type { CapabilityKey } from "./AllCapabilities";
import { CAPABILITIES } from "./Capabilities";

export const CAPABILITY_MANAGEMENT = {
  READ: CAPABILITIES.READ.key,
  CREATE: CAPABILITIES.CREATE.key,
  UPDATE: CAPABILITIES.UPDATE.key,
  DELETE: CAPABILITIES.DELETE.key,
} as const satisfies Record<string, CapabilityKey>;

export const capabilityManagementCapabilities = (): readonly CapabilityKey[] => [
  CAPABILITY_MANAGEMENT.READ,
  CAPABILITY_MANAGEMENT.CREATE,
  CAPABILITY_MANAGEMENT.UPDATE,
  CAPABILITY_MANAGEMENT.DELETE,
];
