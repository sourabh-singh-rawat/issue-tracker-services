import {
  ORGANIZATION_ROLES,
  ORGANIZATIONS,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Organization } from "@/db";
import type { IOrganizationMemberRepository } from "@/features/organizationMembers/repositories";
import { OrganizationRoleNotFoundError } from "@/features/organizationRoles/errors";
import type { IOrganizationRoleRepository } from "@/features/organizationRoles/repositories";
import {
  InvalidParentOrganizationError,
  OrganizationNameConflictError,
  OrganizationNotFoundError,
  OrganizationSlugConflictError,
} from "@/features/organizations/errors";
import type { IOrganizationRepository } from "@/features/organizations/repositories";
import type {
  CreateOrganizationInput,
  IOrganizationService,
  ListOrganizationsInput,
} from "@/features/organizations/services/IOrganizationService";
import { TenantNotFoundError } from "@/features/tenants/errors";
import type { ITenantRepository } from "@/features/tenants/repositories";

@injectable()
export class OrganizationService implements IOrganizationService {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
    @inject(TYPES.OrganizationRoleRepository)
    private readonly organizationRoleRepository: IOrganizationRoleRepository,
    @inject(TYPES.OrganizationMemberRepository)
    private readonly organizationMemberRepository: IOrganizationMemberRepository,
    @inject(TYPES.TenantRepository)
    private readonly tenantRepository: ITenantRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createOrganization(
    input: CreateOrganizationInput,
    userId: string,
  ): Promise<Organization> {
    await requireCapability(this.authorizationClient, userId, ORGANIZATIONS.CREATE.key);

    const tenant = await this.tenantRepository.findById(input.tenantId);
    if (!tenant) {
      throw new TenantNotFoundError(`Tenant not found: ${input.tenantId}`);
    }

    if (input.parentOrganizationId) {
      const parent = await this.organizationRepository.findById(input.parentOrganizationId);
      if (!parent || parent.tenantId !== input.tenantId) {
        throw new InvalidParentOrganizationError(
          `Parent organization not found in tenant: ${input.parentOrganizationId}`,
        );
      }
    }

    const slugExists = await this.organizationRepository.existsBySlugInTenant(
      input.tenantId,
      input.slug,
    );
    if (slugExists) {
      throw new OrganizationSlugConflictError(
        `Organization slug already exists in tenant: ${input.slug}`,
      );
    }

    const nameExists = await this.organizationRepository.existsByNameInTenant(
      input.tenantId,
      input.name,
    );
    if (nameExists) {
      throw new OrganizationNameConflictError(
        `Organization name already exists in tenant: ${input.name}`,
      );
    }

    return this.db.transaction(async (tx) => {
      const organization = await this.organizationRepository.save(
        {
          tenantId: input.tenantId,
          parentOrganizationId: input.parentOrganizationId,
          name: input.name,
          slug: input.slug,
          description: input.description,
          isActive: input.isActive,
        },
        { tx },
      );

      const systemRoles = await this.organizationRoleRepository.seedSystemRoles(
        organization.id,
        { tx },
      );

      const ownerRole = systemRoles.find(
        (role) => role.key === ORGANIZATION_ROLES.ORGANIZATION_OWNER.key,
      );
      if (!ownerRole) {
        throw new OrganizationRoleNotFoundError(
          `Organization owner role not found for organization: ${organization.id}`,
        );
      }

      await this.organizationMemberRepository.save(
        {
          organizationId: organization.id,
          roleId: ownerRole.id,
          identityId: userId,
          assignedBy: userId,
        },
        { tx },
      );

      return organization;
    });
  }

  async getOrganizationById(id: string, userId: string): Promise<Organization> {
    await requireCapability(this.authorizationClient, userId, ORGANIZATIONS.READ.key);

    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw new OrganizationNotFoundError(`Organization not found: ${id}`);
    }

    return organization;
  }

  async listOrganizations(
    input: ListOrganizationsInput,
    userId: string,
  ): Promise<Organization[]> {
    await requireCapability(this.authorizationClient, userId, ORGANIZATIONS.READ.key);

    const tenant = await this.tenantRepository.findById(input.tenantId);
    if (!tenant) {
      throw new TenantNotFoundError(`Tenant not found: ${input.tenantId}`);
    }

    return this.organizationRepository.findMany({
      tenantId: input.tenantId,
      parentOrganizationId: input.parentOrganizationId,
    });
  }

  async deleteOrganization(id: string, userId: string): Promise<void> {
    await requireCapability(this.authorizationClient, userId, ORGANIZATIONS.DELETE.key);

    const deleted = await this.organizationRepository.softDelete(id);
    if (!deleted) {
      throw new OrganizationNotFoundError(`Organization not found: ${id}`);
    }
  }
}
