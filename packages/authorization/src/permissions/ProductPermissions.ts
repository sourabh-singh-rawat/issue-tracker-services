import { definePermissions } from "./definePermissions";

export const PRODUCT_PERMISSIONS = definePermissions(["read", "update", "delete"]);

export type ProductPermission = (typeof PRODUCT_PERMISSIONS)[number];
