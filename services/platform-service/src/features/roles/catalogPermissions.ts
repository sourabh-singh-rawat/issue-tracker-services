import { parsePermission } from "@pine/authorization";

export type CatalogPermission = {
  key: string;
  namespace: string;
  permission: string;
};

export const catalogPermissionsFromKeys = (
  keys: readonly string[],
): CatalogPermission[] =>
  keys.map((key) => {
    const parsed = parsePermission(key);
    return {
      key,
      namespace: parsed.namespace,
      permission: parsed.permission,
    };
  });
