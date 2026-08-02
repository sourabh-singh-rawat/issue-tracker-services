import type { Relationship } from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationService } from "@/features/authorization/services/IAuthorizationService";
import type { IRoleResourceRepository } from "@/features/roles/repositories";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class AuthorizationService implements IAuthorizationService {
  constructor(
    @inject(TYPES.RoleResourceRepository)
    private readonly roleResourceRepository: IRoleResourceRepository,
    @inject(TYPES.AuthorizationGraphProvider)
    private readonly authorizationGraphProvider: IAuthorizationGraphProvider,
  ) {}

  async hasCapability(roles: string[], permissions: string[]): Promise<boolean> {
    if (roles.length === 0 || permissions.length === 0) {
      return false;
    }

    return this.roleResourceRepository.existsByRoleKeysAndResourceKeys(roles, permissions);
  }

  async hasRelationship(relationship: Relationship): Promise<boolean> {
    return this.authorizationGraphProvider.checkPermission(
      relationship.object,
      relationship.relation,
      relationship.subject,
    );
  }
}
