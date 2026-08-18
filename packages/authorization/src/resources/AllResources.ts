export type Resource =
  | "profile"
  | "platform"
  | "tenant"
  | "organization"
  | "product"
  | "brand"
  | "role"
  | "permission";

export type ResourceKey = `${Resource}:${string}`;

export const RESOURCES: readonly Resource[] = [
  "profile",
  "platform",
  "tenant",
  "organization",
  "product",
  "brand",
  "role",
  "permission",
];

export const isResource = (value: string): value is Resource => {
  for (const resource of RESOURCES) {
    if (resource === value) {
      return true;
    }
  }
  return false;
};
