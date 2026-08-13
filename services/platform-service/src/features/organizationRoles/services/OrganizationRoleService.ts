import {
  ORGANIZATIONS,
  organizationRoleCapabilityKeys,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Capability, DbClient, OrganizationRole } from "@/db";
import type { ICapabilityRepository } from "@/features/capabilities/repositories";
import { OrganizationNotFoundError } from "@/features/organizations/errors";
import type { IOrganizationRepository } from "@/features/organizations/repositories";
import { OrganizationRoleNotFoundError } from "@/features/organizationRoles/errors";
import type { IOrganizationRoleRepository } from "@/features/organizationRoles/repositories";
import type { IOrganizationRoleService } from "@/features/organizationRoles/services/IOrganizationRoleService";

@injectable()
export class OrganizationRoleService implements IOrganizationRoleService {
  constructor(
    @inject(TYPES.OrganizationRoleRepository)
    private readonly organizationRoleRepository: IOrganizationRoleRepository,
    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
    @inject(TYPES.CapabilityRepository)
    private readonly capabilityRepository: ICapabilityRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async getOrganizationRoleById(id: string, userId: string): Promise<OrganizationRole> {
    await requireCapability(this.authorizationClient, userId, ORGANIZATIONS.READ.key);

    const role = await this.organizationRoleRepository.findById(id);
    if (!role) {
      throw new OrganizationRoleNotFoundError(`Organization role not found: ${id}`);
    }

    return role;
  }

  async listOrganizationRoles(
    organizationId: string,
    userId: string,
  ): Promise<OrganizationRole[]> {
    await requireCapability(this.authorizationClient, userId, ORGANIZATIONS.READ.key);

    const organization = await this.organizationRepository.findById(organizationId);
    if (!organization) {
      throw new OrganizationNotFoundError(`Organization not found: ${organizationId}`);
    }

    const existing = await this.organizationRoleRepository.findByOrganizationId(organizationId);
    if (existing.length > 0) {
      return existing;
    }

    return this.organizationRoleRepository.seedSystemRoles(organizationId);
  }

  async getCapabilitiesForOrganizationRole(role: OrganizationRole): Promise<Capability[]> {
    const keys = [...organizationRoleCapabilityKeys({ key: role.key })];
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
    organizationId: string,
    options?: { tx: DbClient },
  ): Promise<OrganizationRole[]> {
    return this.organizationRoleRepository.seedSystemRoles(organizationId, options);
  }
}
