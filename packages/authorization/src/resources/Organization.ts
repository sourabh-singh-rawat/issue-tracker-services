import type { ResourceDefinition } from "./ResourceDefinition";

export const ORGANIZATION = {
  name: "organization",
  description: "Organization entities within a tenant",
  isSystem: true,
} as const satisfies ResourceDefinition;
