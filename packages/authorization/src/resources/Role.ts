import type { ResourceDefinition } from "./ResourceDefinition";

export const ROLE = {
  name: "role",
  description: "Authorization roles",
  isSystem: true,
} as const satisfies ResourceDefinition;
