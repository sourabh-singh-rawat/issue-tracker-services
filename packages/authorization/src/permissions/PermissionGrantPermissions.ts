import { definePermissions } from "./definePermissions";

export const PERMISSION_GRANT_PERMISSIONS = definePermissions([
  "read",
  "create",
  "update",
  "delete",
]);

export type PermissionGrantPermission = (typeof PERMISSION_GRANT_PERMISSIONS)[number];
