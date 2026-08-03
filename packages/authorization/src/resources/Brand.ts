import type { ResourceDefinition } from "./ResourceDefinition";

export const BRAND = {
  name: "brand",
  description: "Brand entities",
  isSystem: true,
} as const satisfies ResourceDefinition;
