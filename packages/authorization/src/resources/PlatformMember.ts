import type { ResourceDefinition } from "./ResourceDefinition";

export const PLATFORM_MEMBER = {
  name: "platform_member",
  description: "Platform members with assigned platform roles",
  isSystem: true,
} as const satisfies ResourceDefinition;
