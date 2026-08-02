import type { ResourceDefinition } from "../ResourceDefinition";

export const ROLES = {
  READ: {
    key: "authorization.roles.read",
    type: "capability",
    name: "Read roles",
    description: "Allows listing and viewing roles",
    relations: {
      has: "has",
    },
  },
  CREATE: {
    key: "authorization.roles.create",
    type: "capability",
    name: "Create roles",
    description: "Allows creating roles",
    relations: {
      has: "has",
    },
  },
  UPDATE: {
    key: "authorization.roles.update",
    type: "capability",
    name: "Update roles",
    description: "Allows updating roles",
    relations: {
      has: "has",
    },
  },
  DELETE: {
    key: "authorization.roles.delete",
    type: "capability",
    name: "Delete roles",
    description: "Allows deleting roles",
    relations: {
      has: "has",
    },
  },
} as const satisfies Record<string, ResourceDefinition>;
