import {
  BRANDS,
  CAPABILITY_GRANTS,
  ORGANIZATIONS,
  PRODUCTS,
  ROLES,
} from "../capabilities";
import { capabilityKeys, withoutActions } from "../utils";
import type { RoleDefinition } from "./RoleDefinition";

export const ORGANIZATION_ROLES = {
  ORGANIZATION_OWNER: {
    id: "01900000-0000-7000-8000-000000000002",
    key: "organization.owner",
    name: "Organization Owner",
    description:
      "Full control of an organization, including roles, grants, products, and brands",
    capabilityKeys: capabilityKeys(
      withoutActions(ORGANIZATIONS, "create"),
      ROLES,
      CAPABILITY_GRANTS,
      PRODUCTS,
      BRANDS,
    ),
  },
  ORGANIZATION_ADMIN: {
    id: "01900000-0000-7000-8000-000000000003",
    key: "organization.admin",
    name: "Organization Admin",
    description:
      "Manages organization settings, grants, products, and brands without deleting the organization or defining roles",
    capabilityKeys: capabilityKeys(
      withoutActions(ORGANIZATIONS, "create", "delete"),
      [ROLES.READ.key],
      CAPABILITY_GRANTS,
      PRODUCTS,
      BRANDS,
    ),
  },
  ORGANIZATION_MEMBER: {
    id: "01900000-0000-7000-8000-000000000004",
    key: "organization.member",
    name: "Organization Member",
    description: "Read access to organization resources, products, brands, and roles",
    capabilityKeys: capabilityKeys([
      ORGANIZATIONS.READ.key,
      PRODUCTS.READ.key,
      BRANDS.READ.key,
      ROLES.READ.key,
    ]),
  },
} as const satisfies Record<string, RoleDefinition>;

export const ALL_ORGANIZATION_ROLES: readonly RoleDefinition[] = [
  ORGANIZATION_ROLES.ORGANIZATION_OWNER,
  ORGANIZATION_ROLES.ORGANIZATION_ADMIN,
  ORGANIZATION_ROLES.ORGANIZATION_MEMBER,
];

export type OrganizationRoleKey = (typeof ALL_ORGANIZATION_ROLES)[number]["key"];
