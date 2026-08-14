import { definePermissions } from "./definePermissions";

export const ROLE_PERMISSIONS = definePermissions(["read", "create", "update", "delete"]);

export type RolePermission = (typeof ROLE_PERMISSIONS)[number];
