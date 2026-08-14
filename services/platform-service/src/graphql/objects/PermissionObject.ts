import { builder } from "@pine/server";
import type { CatalogPermission } from "@/features/roles/catalogPermissions";

export const PermissionObject = builder.objectRef<CatalogPermission>("PermissionObject");

PermissionObject.implement({
  fields: (t) => ({
    key: t.exposeString("key"),
    namespace: t.exposeString("namespace"),
    permission: t.exposeString("permission"),
  }),
});
