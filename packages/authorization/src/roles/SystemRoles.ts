import {
  organizationManagementCapabilities,
  organizationManagementWithoutDeleteCapabilities,
  roleManagementCapabilities,
} from "../resources";
import {
  allCapabilityKeys,
  capabilityKeys,
  readCapabilityKeys,
} from "../utils";
import type { RoleDefinition } from "./RoleDefinition";

export const SYSTEM_ROLES = {
  SYSTEM_ADMINISTRATOR: {
    id: "01900000-0000-7000-8000-000000000001",
    key: "system.administrator",
    name: "System Administrator",
    description: "Full platform access — all authorization and organization capabilities",
    capabilityKeys: allCapabilityKeys(),
  },
  ORGANIZATION_OWNER: {
    id: "01900000-0000-7000-8000-000000000002",
    key: "organization.owner",
    name: "Organization Owner",
    description:
      "Full control of an organization, including delete and role management",
    capabilityKeys: capabilityKeys(
      organizationManagementCapabilities(),
      roleManagementCapabilities(),
    ),
  },
  ORGANIZATION_ADMINISTRATOR: {
    id: "01900000-0000-7000-8000-000000000003",
    key: "organization.administrator",
    name: "Organization Administrator",
    description: "Manage an organization without capability to delete it",
    capabilityKeys: capabilityKeys(organizationManagementWithoutDeleteCapabilities()),
  },
  READ_ONLY: {
    id: "01900000-0000-7000-8000-000000000004",
    key: "system.read-only",
    name: "Read Only",
    description: "Read-only access across cataloged resources",
    capabilityKeys: readCapabilityKeys(),
  },
} as const satisfies Record<string, RoleDefinition>;

export const ALL_SYSTEM_ROLES: readonly RoleDefinition[] = [
  SYSTEM_ROLES.SYSTEM_ADMINISTRATOR,
  SYSTEM_ROLES.ORGANIZATION_OWNER,
  SYSTEM_ROLES.ORGANIZATION_ADMINISTRATOR,
  SYSTEM_ROLES.READ_ONLY,
];

export type SystemRoleKey = (typeof ALL_SYSTEM_ROLES)[number]["key"];
