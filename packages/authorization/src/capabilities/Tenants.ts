import { defineCapability } from "./defineCapability";

export const TENANTS = {
  READ: defineCapability("tenant", "tenant", "read"),
  CREATE: defineCapability("tenant", "tenant", "create"),
  UPDATE: defineCapability("tenant", "tenant", "update"),
  DELETE: defineCapability("tenant", "tenant", "delete"),
} as const;
