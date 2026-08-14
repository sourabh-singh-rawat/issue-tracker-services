import type { Tenant } from "@/db";

export type CreateTenantInput = {
  platformId: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export interface ITenantService {
  createTenant(input: CreateTenantInput, userId: string): Promise<Tenant>;
  getTenantById(id: string, userId: string): Promise<Tenant>;
  listTenants(platformId: string, userId: string): Promise<Tenant[]>;
  deleteTenant(id: string, platformId: string, userId: string): Promise<void>;
}
