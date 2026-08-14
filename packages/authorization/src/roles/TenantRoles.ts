import {
  ORGANIZATION_PERMISSIONS,
  PERMISSION_GRANT_PERMISSIONS,
  ROLE_PERMISSIONS,
  TENANT_PERMISSIONS,
} from "../permissions";
import { ORGANIZATION } from "../resources/Organization";
import { PERMISSION } from "../resources/Permission";
import { ROLE } from "../resources/Role";
import { TENANT } from "../resources/Tenant";
import { permissionKeys, withoutActions } from "../utils";
import type { RoleDefinition } from "./RoleDefinition";

export const TENANT_ROLES = {
  TENANT_OWNER: {
    id: "01900000-0000-7000-8000-000000000005",
    key: "tenant.owner",
    name: "Tenant Owner",
    description:
      "Full control of a tenant, including organizations, roles, grants, and membership",
    permissionKeys: [
      ...permissionKeys(TENANT.name, TENANT_PERMISSIONS),
      ...permissionKeys(ORGANIZATION.name, ORGANIZATION_PERMISSIONS),
      ...permissionKeys(ROLE.name, ROLE_PERMISSIONS),
      ...permissionKeys(PERMISSION.name, PERMISSION_GRANT_PERMISSIONS),
    ],
  },
  TENANT_ADMIN: {
    id: "01900000-0000-7000-8000-000000000006",
    key: "tenant.admin",
    name: "Tenant Admin",
    description:
      "Manages tenant settings, membership, organizations, and grants without suspending the tenant or defining roles",
    permissionKeys: [
      ...permissionKeys(
        TENANT.name,
        withoutActions(TENANT_PERMISSIONS, "suspend", "delete", "assign_owner"),
      ),
      ...permissionKeys(ORGANIZATION.name, withoutActions(ORGANIZATION_PERMISSIONS, "delete")),
      ...permissionKeys(ROLE.name, ["read"]),
      ...permissionKeys(PERMISSION.name, PERMISSION_GRANT_PERMISSIONS),
    ],
  },
  TENANT_MEMBER: {
    id: "01900000-0000-7000-8000-000000000007",
    key: "tenant.member",
    name: "Tenant Member",
    description: "Read access to tenant resources, organizations, and roles",
    permissionKeys: [
      ...permissionKeys(TENANT.name, ["read"]),
      ...permissionKeys(ORGANIZATION.name, ["read"]),
      ...permissionKeys(ROLE.name, ["read"]),
    ],
  },
} as const satisfies Record<string, RoleDefinition>;

export const ALL_TENANT_ROLES: readonly RoleDefinition[] = [
  TENANT_ROLES.TENANT_OWNER,
  TENANT_ROLES.TENANT_ADMIN,
  TENANT_ROLES.TENANT_MEMBER,
];

export type TenantRoleKey = (typeof ALL_TENANT_ROLES)[number]["key"];
