import { defineCapability } from "./defineCapability";

export const TENANTS = {
  READ: defineCapability("tenant", "tenant", "read"),
  CREATE: defineCapability("tenant", "tenant", "create"),
  SUSPEND: defineCapability("tenant", "tenant", "suspend"),
  CONFIGURE: defineCapability("tenant", "tenant", "configure"),
  ASSIGN_ADMIN: defineCapability("tenant", "tenant", "assignadmin"),
} as const;
