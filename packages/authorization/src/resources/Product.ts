import type { ResourceDefinition } from "./ResourceDefinition";

export const PRODUCT = {
  name: "product",
  description: "Product catalog entities",
  isSystem: true,
} as const satisfies ResourceDefinition;
