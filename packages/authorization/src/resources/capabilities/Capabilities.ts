import type { ResourceDefinition } from "../ResourceDefinition";

export const CAPABILITIES = {
  READ: {
    key: "authorization.capabilities.read",
    type: "capability",
    name: "Read capabilities",
    description: "Allows listing and viewing capabilities",
    relations: {
      has: "has",
    },
  },
  CREATE: {
    key: "authorization.capabilities.create",
    type: "capability",
    name: "Create capabilities",
    description: "Allows creating capabilities",
    relations: {
      has: "has",
    },
  },
  UPDATE: {
    key: "authorization.capabilities.update",
    type: "capability",
    name: "Update capabilities",
    description: "Allows updating capabilities",
    relations: {
      has: "has",
    },
  },
  DELETE: {
    key: "authorization.capabilities.delete",
    type: "capability",
    name: "Delete capabilities",
    description: "Allows deleting capabilities",
    relations: {
      has: "has",
    },
  },
} as const satisfies Record<string, ResourceDefinition>;
