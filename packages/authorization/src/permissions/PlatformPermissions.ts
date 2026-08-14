import { definePermissions } from "./definePermissions";

export const PLATFORM_PERMISSIONS = definePermissions([
  "read",
  "create_tenant",
  "manage_admins",
]);

export type PlatformPermission = (typeof PLATFORM_PERMISSIONS)[number];
