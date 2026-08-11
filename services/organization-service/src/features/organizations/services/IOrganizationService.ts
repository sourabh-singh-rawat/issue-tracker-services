import type { Organization } from "@/db";

export type CreateOrganizationInput = {
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export interface IOrganizationService {
  createOrganization(input: CreateOrganizationInput, userId: string): Promise<Organization>;
  listOrganizations(userId: string): Promise<Organization[]>;
  deleteOrganization(id: string, userId: string): Promise<void>;
}
