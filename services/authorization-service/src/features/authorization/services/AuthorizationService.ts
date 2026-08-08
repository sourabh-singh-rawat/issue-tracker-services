import type { GraphRelationship } from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationService } from "@/features/authorization/services/IAuthorizationService";
import type { IRoleCapabilityRepository } from "@/features/roles/repositories";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class AuthorizationService implements IAuthorizationService {
  constructor(
    @inject(TYPES.RoleCapabilityRepository)
    private readonly roleCapabilityRepository: IRoleCapabilityRepository,
    @inject(TYPES.AuthorizationGraphProvider)
    private readonly authorizationGraphProvider: IAuthorizationGraphProvider,
  ) {}

  async hasCapability(roles: string[], capabilityKeys: string[]): Promise<boolean> {
    if (roles.length === 0 || capabilityKeys.length === 0) {
      return false;
    }

    return this.roleCapabilityRepository.existsByRoleKeysAndCapabilityKeys(roles, capabilityKeys);
  }

  async hasRelationship(relationship: GraphRelationship): Promise<boolean> {
    return this.authorizationGraphProvider.checkPermission(
      relationship.object,
      relationship.relation,
      relationship.subject,
    );
  }
}
