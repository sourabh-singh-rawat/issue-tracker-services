import { defineCapability } from "./defineCapability";

export const ORGANIZATIONS = {
  READ: defineCapability("organization", "organization", "read"),
  CREATE: defineCapability("organization", "organization", "create"),
  UPDATE: defineCapability("organization", "organization", "update"),
  DELETE: defineCapability("organization", "organization", "delete"),
} as const;
