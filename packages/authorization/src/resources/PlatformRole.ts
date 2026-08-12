import type { ResourceDefinition } from "./ResourceDefinition";

export const PLATFORM_ROLE = {
  name: "platform_role",
  description: "Platform-scoped roles",
  isSystem: true,
} as const satisfies ResourceDefinition;
