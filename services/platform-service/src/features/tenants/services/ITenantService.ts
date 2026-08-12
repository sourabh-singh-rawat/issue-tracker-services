import type { Tenant } from "@/db";

export type CreateTenantInput = {
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export interface ITenantService {
  createTenant(input: CreateTenantInput, userId: string): Promise<Tenant>;
  getTenantById(id: string, userId: string): Promise<Tenant>;
  listTenants(userId: string): Promise<Tenant[]>;
  deleteTenant(id: string, userId: string): Promise<void>;
}
