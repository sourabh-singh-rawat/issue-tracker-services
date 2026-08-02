import type { CapabilityKey } from "./AllCapabilities";
import { PRODUCTS } from "./Products";

export const PRODUCT_MANAGEMENT = {
  READ: PRODUCTS.READ.key,
  CREATE: PRODUCTS.CREATE.key,
  UPDATE: PRODUCTS.UPDATE.key,
  DELETE: PRODUCTS.DELETE.key,
} as const satisfies Record<string, CapabilityKey>;

export const productManagementCapabilities = (): readonly CapabilityKey[] => [
  PRODUCT_MANAGEMENT.READ,
  PRODUCT_MANAGEMENT.CREATE,
  PRODUCT_MANAGEMENT.UPDATE,
  PRODUCT_MANAGEMENT.DELETE,
];
