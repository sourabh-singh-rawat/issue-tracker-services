import type { ResourceDefinition } from "./ResourceDefinition";

export const ORGANIZATION = {
  name: "organization",
  description: "Organization entities",
  isSystem: true,
} as const satisfies ResourceDefinition;
