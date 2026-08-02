import type { ResourceDefinition } from "../ResourceDefinition";

export const PRODUCTS = {
  READ: {
    key: "product.products.read",
    type: "capability",
    name: "Read products",
    description: "Allows listing and viewing products",
    relations: {
      has: "has",
    },
  },
  CREATE: {
    key: "product.products.create",
    type: "capability",
    name: "Create products",
    description: "Allows creating products",
    relations: {
      has: "has",
    },
  },
  UPDATE: {
    key: "product.products.update",
    type: "capability",
    name: "Update products",
    description: "Allows updating products",
    relations: {
      has: "has",
    },
  },
  DELETE: {
    key: "product.products.delete",
    type: "capability",
    name: "Delete products",
    description: "Allows deleting products",
    relations: {
      has: "has",
    },
  },
} as const satisfies Record<string, ResourceDefinition>;
