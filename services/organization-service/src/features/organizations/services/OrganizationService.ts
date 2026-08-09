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
  ) {}

  async createOrganization(input: CreateOrganizationInput): Promise<Organization> {
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

  async listOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async deleteOrganization(id: string): Promise<void> {
    const deleted = await this.organizationRepository.softDelete(id);
    if (!deleted) {
      throw new OrganizationNotFoundError(`Organization not found: ${id}`);
    }
  }
}
