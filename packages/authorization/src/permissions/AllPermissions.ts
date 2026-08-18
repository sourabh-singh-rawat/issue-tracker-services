import type { Resource } from "../resources";

export type ProfilePermission = "read" | "update";

export type PlatformPermission = "read" | "create_tenant" | "manage_admins";

export type TenantPermission =
  | "read"
  | "configure"
  | "manage_members"
  | "create_organization"
  | "assign_admin"
  | "assign_owner"
  | "suspend"
  | "delete";

export type OrganizationPermission =
  | "read"
  | "update"
  | "manage_members"
  | "create_product"
  | "delete";

export type ProductPermission = "read" | "update" | "delete";

export type BrandPermission = "read" | "create" | "update" | "delete";

export type RolePermission = "read" | "create" | "update" | "delete";

export type PermissionGrantPermission = "read" | "create" | "update" | "delete";

export type Permission =
  | ProfilePermission
  | PlatformPermission
  | TenantPermission
  | OrganizationPermission
  | ProductPermission
  | BrandPermission
  | RolePermission
  | PermissionGrantPermission;

export type PermissionKey =
  | `profile:${ProfilePermission}`
  | `platform:${PlatformPermission}`
  | `tenant:${TenantPermission}`
  | `organization:${OrganizationPermission}`
  | `product:${ProductPermission}`
  | `brand:${BrandPermission}`
  | `role:${RolePermission}`
  | `permission:${PermissionGrantPermission}`;

export const PROFILE_PERMISSIONS: readonly ProfilePermission[] = ["read", "update"];

export const PLATFORM_PERMISSIONS: readonly PlatformPermission[] = [
  "read",
  "create_tenant",
  "manage_admins",
];

export const TENANT_PERMISSIONS: readonly TenantPermission[] = [
  "read",
  "configure",
  "manage_members",
  "create_organization",
  "assign_admin",
  "assign_owner",
  "suspend",
  "delete",
];

export const ORGANIZATION_PERMISSIONS: readonly OrganizationPermission[] = [
  "read",
  "update",
  "manage_members",
  "create_product",
  "delete",
];

export const PRODUCT_PERMISSIONS: readonly ProductPermission[] = ["read", "update", "delete"];

export const BRAND_PERMISSIONS: readonly BrandPermission[] = [
  "read",
  "create",
  "update",
  "delete",
];

export const ROLE_PERMISSIONS: readonly RolePermission[] = ["read", "create", "update", "delete"];

export const PERMISSION_GRANT_PERMISSIONS: readonly PermissionGrantPermission[] = [
  "read",
  "create",
  "update",
  "delete",
];

const catalog = (
  namespace: Resource,
  permissions: readonly string[],
): readonly { namespace: Resource; permission: string }[] =>
  permissions.map((permission) => ({ namespace, permission }));

export const ALL_PERMISSIONS = [
  ...catalog("profile", PROFILE_PERMISSIONS),
  ...catalog("platform", PLATFORM_PERMISSIONS),
  ...catalog("tenant", TENANT_PERMISSIONS),
  ...catalog("organization", ORGANIZATION_PERMISSIONS),
  ...catalog("product", PRODUCT_PERMISSIONS),
  ...catalog("brand", BRAND_PERMISSIONS),
  ...catalog("role", ROLE_PERMISSIONS),
  ...catalog("permission", PERMISSION_GRANT_PERMISSIONS),
];
