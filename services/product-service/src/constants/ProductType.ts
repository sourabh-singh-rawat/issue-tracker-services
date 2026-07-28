export const PRODUCT_TYPE = {
  STOCK_ITEM: "STOCK_ITEM",
  SERVICE: "SERVICE",
  NON_STOCK_ITEM: "NON_STOCK_ITEM",
} as const;

export type ProductType = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];

export const PRODUCT_TYPES = Object.values(PRODUCT_TYPE);
