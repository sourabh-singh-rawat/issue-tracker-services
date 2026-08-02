import type { ResourceDefinition } from "../ResourceDefinition";

export const CAPABILITY_GRANTS = {
  READ: {
    key: "authorization.capability-grants.read",
    type: "capability",
    name: "Read capability grants",
    description: "Allows listing and viewing capability grants",
    relations: {
      has: "has",
    },
  },
  CREATE: {
    key: "authorization.capability-grants.create",
    type: "capability",
    name: "Create capability grants",
    description: "Allows granting capabilities to subjects",
    relations: {
      has: "has",
    },
  },
  UPDATE: {
    key: "authorization.capability-grants.update",
    type: "capability",
    name: "Update capability grants",
    description: "Allows updating capability grants",
    relations: {
      has: "has",
    },
  },
  DELETE: {
    key: "authorization.capability-grants.delete",
    type: "capability",
    name: "Delete capability grants",
    description: "Allows revoking capability grants",
    relations: {
      has: "has",
    },
  },
} as const satisfies Record<string, ResourceDefinition>;
