import type { ResourceDefinition } from "../ResourceDefinition";

export const ORGANIZATIONS = {
  READ: {
    key: "organization.organizations.read",
    type: "capability",
    name: "Read organizations",
    description: "Allows listing and viewing organizations",
    relations: {
      has: "has",
    },
  },
  CREATE: {
    key: "organization.organizations.create",
    type: "capability",
    name: "Create organizations",
    description: "Allows creating organizations",
    relations: {
      has: "has",
    },
  },
  UPDATE: {
    key: "organization.organizations.update",
    type: "capability",
    name: "Update organizations",
    description: "Allows updating organizations",
    relations: {
      has: "has",
    },
  },
  DELETE: {
    key: "organization.organizations.delete",
    type: "capability",
    name: "Delete organizations",
    description: "Allows deleting organizations",
    relations: {
      has: "has",
    },
  },
} as const satisfies Record<string, ResourceDefinition>;
