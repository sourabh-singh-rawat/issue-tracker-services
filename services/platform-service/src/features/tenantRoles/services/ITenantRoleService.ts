import type { Capability, DbClient, TenantRole } from "@/db";

export interface ITenantRoleService {
  getTenantRoleById: (id: string, userId: string) => Promise<TenantRole>;
  listTenantRoles: (tenantId: string, userId: string) => Promise<TenantRole[]>;
  getCapabilitiesForTenantRole: (role: TenantRole) => Promise<Capability[]>;
  seedSystemRoles: (
    tenantId: string,
    options?: { tx: DbClient },
  ) => Promise<TenantRole[]>;
}
