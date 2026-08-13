import { defineCapability } from "./defineCapability";

export const PLATFORM_MEMBER = {
  READ: defineCapability("platform", "platform_member", "read"),
  CREATE: defineCapability("platform", "platform_member", "create"),
  UPDATE: defineCapability("platform", "platform_member", "update"),
  DELETE: defineCapability("platform", "platform_member", "delete"),
} as const;
