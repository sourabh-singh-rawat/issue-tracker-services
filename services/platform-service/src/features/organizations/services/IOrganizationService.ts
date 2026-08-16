import type { Organization } from "@/db";

export type CreateOrganizationInput = {
  tenantId: string;
  parentOrganizationId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export type ListOrganizationsInput = {
  tenantId: string;
  parentOrganizationId?: string | null;
};

export type UpdateOrganizationInput = {
  parentOrganizationId?: string | null;
};

export interface IOrganizationService {
  createOrganization(input: CreateOrganizationInput, identityId: string): Promise<Organization>;
  getOrganizationById(id: string, identityId: string): Promise<Organization>;
  listOrganizations(input: ListOrganizationsInput, identityId: string): Promise<Organization[]>;
  updateOrganization(
    id: string,
    input: UpdateOrganizationInput,
    identityId: string,
  ): Promise<Organization>;
  deleteOrganization(id: string, identityId: string): Promise<void>;
}
