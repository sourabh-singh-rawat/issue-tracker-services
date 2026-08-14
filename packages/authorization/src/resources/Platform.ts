import type { ResourceDefinition } from "./ResourceDefinition";

export const PLATFORM = {
  name: "platform",
  description: "Platform singleton",
  isSystem: true,
} as const satisfies ResourceDefinition;

