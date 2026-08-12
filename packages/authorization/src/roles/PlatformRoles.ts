import {
  PLATFORM_ROLE,
  PLATFORM_MEMBER,
  TENANTS,
} from "../capabilities";
import { capabilityKeys } from "../utils";
import type { RoleDefinition } from "./RoleDefinition";

export const PLATFORM_ROLES = {
  PLATFORM_ADMIN: {
    id: "01900000-0000-7000-8000-000000000001",
    key: "platform.admin",
    name: "Platform Admin",
    description:
      "Platform administrator with tenant and platform role management capabilities",
    capabilityKeys: capabilityKeys(TENANTS, PLATFORM_ROLE, PLATFORM_MEMBER),
  },
} as const satisfies Record<string, RoleDefinition>;

export const ALL_PLATFORM_ROLES: readonly RoleDefinition[] = [PLATFORM_ROLES.PLATFORM_ADMIN];

export type PlatformRoleKey = (typeof ALL_PLATFORM_ROLES)[number]["key"];
