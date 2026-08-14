import {
  ORGANIZATION,
  findOrganizationRoleDefinition,
  organizationRolePermissionKeys,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { catalogPermissionsFromKeys } from "@/features/roles/catalogPermissions";
import {
  isCustomStoredRole,
  organizationSystemRoles,
  toOrganizationSystemRole,
} from "@/features/roles/systemRoles";
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
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async getOrganizationRoleById(id: string, userId: string) {
    const definition = findOrganizationRoleDefinition({ id });
    if (definition) {
      return toOrganizationSystemRole(definition, "");
    }

    const role = await this.organizationRoleRepository.findById(id);
    if (!role || !isCustomStoredRole(role)) {
      throw new OrganizationRoleNotFoundError(`Organization role not found: ${id}`);
    }

    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: ORGANIZATION.name,
      id: role.organizationId,
    });

    return role;
  }

  async listOrganizationRoles(organizationId: string, userId: string) {
    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: ORGANIZATION.name,
      id: organizationId,
    });

    const organization = await this.organizationRepository.findById(organizationId);
    if (!organization) {
      throw new OrganizationNotFoundError(`Organization not found: ${organizationId}`);
    }

    const custom = (
      await this.organizationRoleRepository.findByOrganizationId(organizationId)
    ).filter(isCustomStoredRole);

    return [...organizationSystemRoles(organizationId), ...custom];
  }

  getPermissionsForOrganizationRole = (role: { key: string }) =>
    catalogPermissionsFromKeys(organizationRolePermissionKeys({ key: role.key }));
}
