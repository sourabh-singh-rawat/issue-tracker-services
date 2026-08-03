import { defineCapability } from "./defineCapability";

export const ROLES = {
  READ: defineCapability("authorization", "role", "read"),
  CREATE: defineCapability("authorization", "role", "create"),
  UPDATE: defineCapability("authorization", "role", "update"),
  DELETE: defineCapability("authorization", "role", "delete"),
} as const;
