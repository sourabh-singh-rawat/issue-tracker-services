import type { Organization } from "@/db";

export type CreateOrganizationInput = {
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export interface IOrganizationService {
  createOrganization(input: CreateOrganizationInput): Promise<Organization>;
  listOrganizations(): Promise<Organization[]>;
  deleteOrganization(id: string): Promise<void>;
}
