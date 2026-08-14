import type { OrganizationRole } from "@/db";
import type { CatalogPermission } from "@/features/roles/catalogPermissions";

export interface IOrganizationRoleService {
  getOrganizationRoleById: (id: string, userId: string) => Promise<OrganizationRole>;
  listOrganizationRoles: (
    organizationId: string,
    userId: string,
  ) => Promise<OrganizationRole[]>;
  getPermissionsForOrganizationRole: (role: OrganizationRole) => CatalogPermission[];
}
