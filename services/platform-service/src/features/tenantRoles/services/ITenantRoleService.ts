import type { TenantRole } from "@/db";
import type { CatalogPermission } from "@/features/roles/catalogPermissions";

export interface ITenantRoleService {
  getTenantRoleById: (id: string, userId: string) => Promise<TenantRole>;
  listTenantRoles: (tenantId: string, userId: string) => Promise<TenantRole[]>;
  getPermissionsForTenantRole: (role: TenantRole) => CatalogPermission[];
}
