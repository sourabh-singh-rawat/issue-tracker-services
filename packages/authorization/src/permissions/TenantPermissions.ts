import { definePermissions } from "./definePermissions";

export const TENANT_PERMISSIONS = definePermissions([
  "read",
  "configure",
  "manage_members",
  "create_organization",
  "assign_admin",
  "assign_owner",
  "suspend",
  "delete",
]);

export type TenantPermission = (typeof TENANT_PERMISSIONS)[number];
