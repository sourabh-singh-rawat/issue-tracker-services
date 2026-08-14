import type { ResourceDefinition } from "./ResourceDefinition";

export const PERMISSION = {
  name: "permission",
  description: "Authorization permissions",
  isSystem: true,
} as const satisfies ResourceDefinition;
