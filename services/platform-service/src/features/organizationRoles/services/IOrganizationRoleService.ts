import type { Capability, DbClient, OrganizationRole } from "@/db";

export interface IOrganizationRoleService {
  getOrganizationRoleById: (id: string, userId: string) => Promise<OrganizationRole>;
  listOrganizationRoles: (
    organizationId: string,
    userId: string,
  ) => Promise<OrganizationRole[]>;
  getCapabilitiesForOrganizationRole: (role: OrganizationRole) => Promise<Capability[]>;
  seedSystemRoles: (
    organizationId: string,
    options?: { tx: DbClient },
  ) => Promise<OrganizationRole[]>;
}
