import { definePermissions } from "./definePermissions";

export const ORGANIZATION_PERMISSIONS = definePermissions([
  "read",
  "update",
  "manage_members",
  "create_product",
  "delete",
]);

export type OrganizationPermission = (typeof ORGANIZATION_PERMISSIONS)[number];
