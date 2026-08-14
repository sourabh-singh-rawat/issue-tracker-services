import { BRAND } from "../resources/Brand";
import { ORGANIZATION } from "../resources/Organization";
import { PERMISSION } from "../resources/Permission";
import { PLATFORM } from "../resources/Platform";
import { PRODUCT } from "../resources/Product";
import { ROLE } from "../resources/Role";
import { TENANT } from "../resources/Tenant";
import { BRAND_PERMISSIONS, type BrandPermission } from "./BrandPermissions";
import {
  ORGANIZATION_PERMISSIONS,
  type OrganizationPermission,
} from "./OrganizationPermissions";
import {
  PERMISSION_GRANT_PERMISSIONS,
  type PermissionGrantPermission,
} from "./PermissionGrantPermissions";
import { PLATFORM_PERMISSIONS, type PlatformPermission } from "./PlatformPermissions";
import { PRODUCT_PERMISSIONS, type ProductPermission } from "./ProductPermissions";
import { ROLE_PERMISSIONS, type RolePermission } from "./RolePermissions";
import { TENANT_PERMISSIONS, type TenantPermission } from "./TenantPermissions";

export type Permission =
  | PlatformPermission
  | TenantPermission
  | OrganizationPermission
  | ProductPermission
  | BrandPermission
  | RolePermission
  | PermissionGrantPermission;

export type PermissionKey =
  | `${typeof PLATFORM.name}:${PlatformPermission}`
  | `${typeof TENANT.name}:${TenantPermission}`
  | `${typeof ORGANIZATION.name}:${OrganizationPermission}`
  | `${typeof PRODUCT.name}:${ProductPermission}`
  | `${typeof BRAND.name}:${BrandPermission}`
  | `${typeof ROLE.name}:${RolePermission}`
  | `${typeof PERMISSION.name}:${PermissionGrantPermission}`;

const catalog = (
  namespace: string,
  permissions: readonly string[],
): readonly { namespace: string; permission: string }[] =>
  permissions.map((permission) => ({ namespace, permission }));

export const ALL_PERMISSIONS = [
  ...catalog(PLATFORM.name, PLATFORM_PERMISSIONS),
  ...catalog(TENANT.name, TENANT_PERMISSIONS),
  ...catalog(ORGANIZATION.name, ORGANIZATION_PERMISSIONS),
  ...catalog(PRODUCT.name, PRODUCT_PERMISSIONS),
  ...catalog(BRAND.name, BRAND_PERMISSIONS),
  ...catalog(ROLE.name, ROLE_PERMISSIONS),
  ...catalog(PERMISSION.name, PERMISSION_GRANT_PERMISSIONS),
];
