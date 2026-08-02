import type { CapabilityKey } from "./AllCapabilities";
import { ORGANIZATIONS } from "./Organizations";

export const ORGANIZATION_MANAGEMENT = {
  READ: ORGANIZATIONS.READ.key,
  CREATE: ORGANIZATIONS.CREATE.key,
  UPDATE: ORGANIZATIONS.UPDATE.key,
  DELETE: ORGANIZATIONS.DELETE.key,
} as const satisfies Record<string, CapabilityKey>;

export const organizationManagementCapabilities = (): readonly CapabilityKey[] => [
  ORGANIZATION_MANAGEMENT.READ,
  ORGANIZATION_MANAGEMENT.CREATE,
  ORGANIZATION_MANAGEMENT.UPDATE,
  ORGANIZATION_MANAGEMENT.DELETE,
];

export const organizationManagementWithoutDeleteCapabilities =
  (): readonly CapabilityKey[] => [
    ORGANIZATION_MANAGEMENT.READ,
    ORGANIZATION_MANAGEMENT.CREATE,
    ORGANIZATION_MANAGEMENT.UPDATE,
  ];
