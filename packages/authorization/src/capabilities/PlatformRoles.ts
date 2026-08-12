import { defineCapability } from "./defineCapability";

export const PLATFORM_ROLE = {
  READ: defineCapability("platform", "platform_role", "read"),
  CREATE: defineCapability("platform", "platform_role", "create"),
  UPDATE: defineCapability("platform", "platform_role", "update"),
  DELETE: defineCapability("platform", "platform_role", "delete"),
} as const;
