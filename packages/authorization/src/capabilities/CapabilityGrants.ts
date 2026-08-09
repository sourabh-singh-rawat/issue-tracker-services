import { defineCapability } from "./defineCapability";

export const CAPABILITY_GRANTS = {
  READ: defineCapability("authorization", "capability-grant", "read"),
  CREATE: defineCapability("authorization", "capability-grant", "create"),
  UPDATE: defineCapability("authorization", "capability-grant", "update"),
  DELETE: defineCapability("authorization", "capability-grant", "delete"),
} as const;
