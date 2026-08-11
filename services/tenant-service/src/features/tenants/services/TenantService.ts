import {
  TENANTS,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Tenant } from "@/db";
import {
  TenantNameConflictError,
  TenantNotFoundError,
  TenantSlugConflictError,
} from "@/features/tenants/errors";
import type { ITenantRepository } from "@/features/tenants/repositories";
import type {
  CreateTenantInput,
  ITenantService,
} from "@/features/tenants/services/ITenantService";

@injectable()
export class TenantService implements ITenantService {
  constructor(
    @inject(TYPES.TenantRepository)
    private readonly tenantRepository: ITenantRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async createTenant(input: CreateTenantInput, userId: string): Promise<Tenant> {
    await requireCapability(this.authorizationClient, userId, TENANTS.CREATE.key);

    const slugExists = await this.tenantRepository.existsBySlug(input.slug);
    if (slugExists) {
      throw new TenantSlugConflictError(`Tenant slug already exists: ${input.slug}`);
    }

    const nameExists = await this.tenantRepository.existsByName(input.name);
    if (nameExists) {
      throw new TenantNameConflictError(`Tenant name already exists: ${input.name}`);
    }

    return this.tenantRepository.save({
      name: input.name,
      slug: input.slug,
      description: input.description,
      isActive: input.isActive,
    });
  }

  async listTenants(userId: string): Promise<Tenant[]> {
    await requireCapability(this.authorizationClient, userId, TENANTS.READ.key);

    return this.tenantRepository.findAll();
  }

  async deleteTenant(id: string, userId: string): Promise<void> {
    await requireCapability(this.authorizationClient, userId, TENANTS.DELETE.key);

    const deleted = await this.tenantRepository.softDelete(id);
    if (!deleted) {
      throw new TenantNotFoundError(`Tenant not found: ${id}`);
    }
  }
}
