import type { ResourceDefinition } from "./ResourceDefinition";

export const TENANT = {
  name: "tenant",
  description: "Tenant entities",
  isSystem: true,
} as const satisfies ResourceDefinition;
