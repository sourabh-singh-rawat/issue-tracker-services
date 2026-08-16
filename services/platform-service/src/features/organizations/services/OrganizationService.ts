import {
  organizationOwnerRelationship,
  organizationTenantRelationship,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Organization } from "@/db";
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
  UpdateOrganizationInput,
} from "@/features/organizations/services/IOrganizationService";
import { TenantNotFoundError } from "@/features/tenants/errors";
import type { ITenantRepository } from "@/features/tenants/repositories";

@injectable()
export class OrganizationService implements IOrganizationService {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
    @inject(TYPES.TenantRepository)
    private readonly tenantRepository: ITenantRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createOrganization(
    input: CreateOrganizationInput,
    identityId: string,
  ): Promise<Organization> {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "create_organization",
      `tenant:${input.tenantId}`,
    );

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

      await this.authorizationClient.ensureRelationship(
        organizationOwnerRelationship(organization.id, identityId),
      );
      await this.authorizationClient.ensureRelationship(
        organizationTenantRelationship(organization.id, input.tenantId),
      );

      return organization;
    });
  }

  async getOrganizationById(id: string, identityId: string): Promise<Organization> {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "read",
      `organization:${id}`,
    );

    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw new OrganizationNotFoundError(`Organization not found: ${id}`);
    }

    return organization;
  }

  async listOrganizations(
    input: ListOrganizationsInput,
    identityId: string,
  ): Promise<Organization[]> {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "read",
      `tenant:${input.tenantId}`,
    );

    const tenant = await this.tenantRepository.findById(input.tenantId);
    if (!tenant) {
      throw new TenantNotFoundError(`Tenant not found: ${input.tenantId}`);
    }

    return this.organizationRepository.findMany({
      tenantId: input.tenantId,
      parentOrganizationId: input.parentOrganizationId,
    });
  }

  async updateOrganization(
    id: string,
    input: UpdateOrganizationInput,
    identityId: string,
  ): Promise<Organization> {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "update",
      `organization:${id}`,
    );

    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw new OrganizationNotFoundError(`Organization not found: ${id}`);
    }

    if (input.parentOrganizationId !== undefined) {
      await this.assertValidParentOrganization(organization, input.parentOrganizationId);
    }

    const updated = await this.organizationRepository.update(id, {
      parentOrganizationId: input.parentOrganizationId,
    });
    if (!updated) {
      throw new OrganizationNotFoundError(`Organization not found: ${id}`);
    }

    return updated;
  }

  async deleteOrganization(id: string, identityId: string): Promise<void> {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "delete",
      `organization:${id}`,
    );

    const deleted = await this.organizationRepository.softDelete(id);
    if (!deleted) {
      throw new OrganizationNotFoundError(`Organization not found: ${id}`);
    }
  }

  private async assertValidParentOrganization(
    organization: Organization,
    parentOrganizationId: string | null,
  ): Promise<void> {
    if (!parentOrganizationId) {
      return;
    }

    if (parentOrganizationId === organization.id) {
      throw new InvalidParentOrganizationError(
        `Organization cannot be its own parent: ${organization.id}`,
      );
    }

    const parent = await this.organizationRepository.findById(parentOrganizationId);
    if (!parent || parent.tenantId !== organization.tenantId) {
      throw new InvalidParentOrganizationError(
        `Parent organization not found in tenant: ${parentOrganizationId}`,
      );
    }

    let ancestorId = parent.parentOrganizationId;
    const seen = new Set<string>([parent.id]);
    while (ancestorId) {
      if (ancestorId === organization.id) {
        throw new InvalidParentOrganizationError(
          `Parent organization would create a cycle: ${parentOrganizationId}`,
        );
      }
      if (seen.has(ancestorId)) {
        break;
      }
      seen.add(ancestorId);
      const ancestor = await this.organizationRepository.findById(ancestorId);
      if (!ancestor) {
        break;
      }
      ancestorId = ancestor.parentOrganizationId;
    }
  }
}
