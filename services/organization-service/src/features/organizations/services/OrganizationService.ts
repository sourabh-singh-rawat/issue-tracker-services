import {
  ORGANIZATIONS,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Organization } from "@/db";
import {
  OrganizationNameConflictError,
  OrganizationNotFoundError,
  OrganizationSlugConflictError,
} from "@/features/organizations/errors";
import type { IOrganizationRepository } from "@/features/organizations/repositories";
import type {
  CreateOrganizationInput,
  IOrganizationService,
} from "@/features/organizations/services/IOrganizationService";

@injectable()
export class OrganizationService implements IOrganizationService {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async createOrganization(input: CreateOrganizationInput, userId: string): Promise<Organization> {
    await requireCapability(this.authorizationClient, userId, ORGANIZATIONS.CREATE.key);

    const slugExists = await this.organizationRepository.existsBySlug(input.slug);
    if (slugExists) {
      throw new OrganizationSlugConflictError(`Organization slug already exists: ${input.slug}`);
    }

    const nameExists = await this.organizationRepository.existsByName(input.name);
    if (nameExists) {
      throw new OrganizationNameConflictError(`Organization name already exists: ${input.name}`);
    }

    return this.organizationRepository.save({
      name: input.name,
      slug: input.slug,
      description: input.description,
      isActive: input.isActive,
    });
  }

  async listOrganizations(userId: string): Promise<Organization[]> {
    await requireCapability(this.authorizationClient, userId, ORGANIZATIONS.READ.key);

    return this.organizationRepository.findAll();
  }

  async deleteOrganization(id: string, userId: string): Promise<void> {
    await requireCapability(this.authorizationClient, userId, ORGANIZATIONS.DELETE.key);

    const deleted = await this.organizationRepository.softDelete(id);
    if (!deleted) {
      throw new OrganizationNotFoundError(`Organization not found: ${id}`);
    }
  }
}
