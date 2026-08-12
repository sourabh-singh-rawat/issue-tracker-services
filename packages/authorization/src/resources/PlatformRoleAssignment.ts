import type { ResourceDefinition } from "./ResourceDefinition";

export const PLATFORM_ROLE_ASSIGNMENT = {
  name: "platform_role_assignment",
  description: "Assignments of platform roles to identities",
  isSystem: true,
} as const satisfies ResourceDefinition;
