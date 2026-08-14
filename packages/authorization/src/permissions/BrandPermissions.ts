import { definePermissions } from "./definePermissions";

export const BRAND_PERMISSIONS = definePermissions(["read", "create", "update", "delete"]);

export type BrandPermission = (typeof BRAND_PERMISSIONS)[number];
