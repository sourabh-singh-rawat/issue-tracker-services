import { defineCapability } from "./defineCapability";

export const ORGANIZATIONS = {
  READ: defineCapability("tenant", "organization", "read"),
  CREATE: defineCapability("tenant", "organization", "create"),
  UPDATE: defineCapability("tenant", "organization", "update"),
  DELETE: defineCapability("tenant", "organization", "delete"),
} as const;
