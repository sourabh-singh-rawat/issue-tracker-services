import type { ResourceDefinition } from "../ResourceDefinition";

export const ORGANIZATION = {
  key: "organization",
  type: "organization",
  name: "Organization",
  description: "Organization resource",
  relations: {
    owner: "owner",
    administrator: "administrator",
    member: "member",
  },
} as const satisfies ResourceDefinition;

export type OrganizationRelation =
  (typeof ORGANIZATION.relations)[keyof typeof ORGANIZATION.relations];
