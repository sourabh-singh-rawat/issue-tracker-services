import {
  BRAND_PERMISSIONS,
  ORGANIZATION_PERMISSIONS,
  PERMISSION_GRANT_PERMISSIONS,
  PRODUCT_PERMISSIONS,
  ROLE_PERMISSIONS,
} from "../permissions";
import { BRAND } from "../resources/Brand";
import { ORGANIZATION } from "../resources/Organization";
import { PERMISSION } from "../resources/Permission";
import { PRODUCT } from "../resources/Product";
import { ROLE } from "../resources/Role";
import { permissionKeys, withoutActions } from "../utils";
import type { RoleDefinition } from "./RoleDefinition";

export const ORGANIZATION_ROLES = {
  ORGANIZATION_OWNER: {
    id: "01900000-0000-7000-8000-000000000002",
    key: "organization.owner",
    name: "Organization Owner",
    description:
      "Full control of an organization, including roles, grants, products, and brands",
    permissionKeys: [
      ...permissionKeys(ORGANIZATION.name, ORGANIZATION_PERMISSIONS),
      ...permissionKeys(ROLE.name, ROLE_PERMISSIONS),
      ...permissionKeys(PERMISSION.name, PERMISSION_GRANT_PERMISSIONS),
      ...permissionKeys(PRODUCT.name, PRODUCT_PERMISSIONS),
      ...permissionKeys(BRAND.name, BRAND_PERMISSIONS),
    ],
  },
  ORGANIZATION_ADMIN: {
    id: "01900000-0000-7000-8000-000000000003",
    key: "organization.admin",
    name: "Organization Admin",
    description:
      "Manages organization settings, grants, products, and brands without deleting the organization or defining roles",
    permissionKeys: [
      ...permissionKeys(
        ORGANIZATION.name,
        withoutActions(ORGANIZATION_PERMISSIONS, "delete"),
      ),
      ...permissionKeys(ROLE.name, ["read"]),
      ...permissionKeys(PERMISSION.name, PERMISSION_GRANT_PERMISSIONS),
      ...permissionKeys(PRODUCT.name, PRODUCT_PERMISSIONS),
      ...permissionKeys(BRAND.name, BRAND_PERMISSIONS),
    ],
  },
  ORGANIZATION_MEMBER: {
    id: "01900000-0000-7000-8000-000000000004",
    key: "organization.member",
    name: "Organization Member",
    description: "Read access to organization resources, products, brands, and roles",
    permissionKeys: [
      ...permissionKeys(ORGANIZATION.name, ["read"]),
      ...permissionKeys(PRODUCT.name, ["read"]),
      ...permissionKeys(BRAND.name, ["read"]),
      ...permissionKeys(ROLE.name, ["read"]),
    ],
  },
} as const satisfies Record<string, RoleDefinition>;

export const ALL_ORGANIZATION_ROLES: readonly RoleDefinition[] = [
  ORGANIZATION_ROLES.ORGANIZATION_OWNER,
  ORGANIZATION_ROLES.ORGANIZATION_ADMIN,
  ORGANIZATION_ROLES.ORGANIZATION_MEMBER,
];

export type OrganizationRoleKey = (typeof ALL_ORGANIZATION_ROLES)[number]["key"];
