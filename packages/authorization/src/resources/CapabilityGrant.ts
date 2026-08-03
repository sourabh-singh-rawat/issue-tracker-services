import type { ResourceDefinition } from "./ResourceDefinition";

export const CAPABILITY_GRANT = {
  name: "capability-grant",
  description: "Capability grant assignments",
  isSystem: true,
} as const satisfies ResourceDefinition;
