import { defineCapability } from "./defineCapability";

export const PLATFORM_ROLE_ASSIGNMENT = {
  READ: defineCapability("platform", "platform_role_assignment", "read"),
  CREATE: defineCapability("platform", "platform_role_assignment", "create"),
  UPDATE: defineCapability("platform", "platform_role_assignment", "update"),
  DELETE: defineCapability("platform", "platform_role_assignment", "delete"),
} as const;
