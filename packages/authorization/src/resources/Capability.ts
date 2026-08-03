import type { ResourceDefinition } from "./ResourceDefinition";

export const CAPABILITY = {
  name: "capability",
  description: "Authorization capabilities",
  isSystem: true,
} as const satisfies ResourceDefinition;
