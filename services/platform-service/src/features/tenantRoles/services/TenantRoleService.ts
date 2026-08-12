import {
  TENANTS,
  tenantRoleCapabilityKeys,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Capability, DbClient, TenantRole } from "@/db";
import type { ICapabilityRepository } from "@/features/capabilities/repositories";
import { TenantNotFoundError } from "@/features/tenants/errors";
import type { ITenantRepository } from "@/features/tenants/repositories";
import { TenantRoleNotFoundError } from "@/features/tenantRoles/errors";
import type { ITenantRoleRepository } from "@/features/tenantRoles/repositories";
import type { ITenantRoleService } from "@/features/tenantRoles/services/ITenantRoleService";

@injectable()
export class TenantRoleService implements ITenantRoleService {
  constructor(
    @inject(TYPES.TenantRoleRepository)
    private readonly tenantRoleRepository: ITenantRoleRepository,
    @inject(TYPES.TenantRepository)
    private readonly tenantRepository: ITenantRepository,
    @inject(TYPES.CapabilityRepository)
    private readonly capabilityRepository: ICapabilityRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async getTenantRoleById(id: string, userId: string): Promise<TenantRole> {
    await requireCapability(this.authorizationClient, userId, TENANTS.READ.key);

    const role = await this.tenantRoleRepository.findById(id);
    if (!role) {
      throw new TenantRoleNotFoundError(`Tenant role not found: ${id}`);
    }

    return role;
  }

  async listTenantRoles(tenantId: string, userId: string): Promise<TenantRole[]> {
    await requireCapability(this.authorizationClient, userId, TENANTS.READ.key);

    const tenant = await this.tenantRepository.findById(tenantId);
    if (!tenant) {
      throw new TenantNotFoundError(`Tenant not found: ${tenantId}`);
    }

    const existing = await this.tenantRoleRepository.findByTenantId(tenantId);
    if (existing.length > 0) {
      return existing;
    }

    return this.tenantRoleRepository.seedSystemRoles(tenantId);
  }

  async getCapabilitiesForTenantRole(role: TenantRole): Promise<Capability[]> {
    const keys = [...tenantRoleCapabilityKeys({ key: role.key })];
    if (keys.length === 0) {
      return [];
    }

    const capabilities = await this.capabilityRepository.findByKeys(keys);
    const byKey = new Map(capabilities.map((capability) => [capability.key, capability]));

    const ordered: Capability[] = [];
    for (const key of keys) {
      const capability = byKey.get(key);
      if (capability) {
        ordered.push(capability);
      }
    }
    return ordered;
  }

  async seedSystemRoles(
    tenantId: string,
    options?: { tx: DbClient },
  ): Promise<TenantRole[]> {
    return this.tenantRoleRepository.seedSystemRoles(tenantId, options);
  }
}
