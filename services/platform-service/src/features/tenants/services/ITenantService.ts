import type { Tenant } from "@/db";

export type CreateTenantInput = {
  platformId: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export interface ITenantService {
  createTenant(input: CreateTenantInput, identityId: string): Promise<Tenant>;
  getTenantById(id: string, identityId: string): Promise<Tenant>;
  listTenants(platformId: string, identityId: string): Promise<Tenant[]>;
  deleteTenant(id: string, platformId: string, identityId: string): Promise<void>;
}
