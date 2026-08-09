import { defineCapability } from "./defineCapability";

export const PRODUCTS = {
  READ: defineCapability("product", "product", "read"),
  CREATE: defineCapability("product", "product", "create"),
  UPDATE: defineCapability("product", "product", "update"),
  DELETE: defineCapability("product", "product", "delete"),
} as const;
