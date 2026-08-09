import { defineCapability } from "./defineCapability";

export const BRANDS = {
  READ: defineCapability("product", "brand", "read"),
  CREATE: defineCapability("product", "brand", "create"),
  UPDATE: defineCapability("product", "brand", "update"),
  DELETE: defineCapability("product", "brand", "delete"),
} as const;
