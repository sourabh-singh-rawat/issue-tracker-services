import type { ResourceDefinition } from "../ResourceDefinition";

export const ROLE = {
  key: "role",
  type: "role",
  name: "Role",
  description: "Role resource",
  relations: {
    assignee: "assignee",
  },
} as const satisfies ResourceDefinition;

export type RoleRelation = (typeof ROLE.relations)[keyof typeof ROLE.relations];
