import { defineCapability } from "./defineCapability";

export const CAPABILITIES = {
  READ: defineCapability("authorization", "capability", "read"),
  CREATE: defineCapability("authorization", "capability", "create"),
  UPDATE: defineCapability("authorization", "capability", "update"),
  DELETE: defineCapability("authorization", "capability", "delete"),
} as const;
