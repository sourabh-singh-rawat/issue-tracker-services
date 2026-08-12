import { defineCapability } from "./defineCapability";

export const TENANTS = {
  READ: defineCapability("platform", "tenant", "read"),
  CREATE: defineCapability("platform", "tenant", "create"),
  SUSPEND: defineCapability("platform", "tenant", "suspend"),
  CONFIGURE: defineCapability("platform", "tenant", "configure"),
  ASSIGN_ADMIN: defineCapability("platform", "tenant", "assignadmin"),
} as const;
