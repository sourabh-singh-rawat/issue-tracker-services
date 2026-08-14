import {
  PLATFORM_RESOURCE,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Identity } from "@/db";
import type { IIdentityRepository } from "@/features/identities/repositories";
import type { IIdentityService } from "@/features/identities/services/IIdentityService";

@injectable()
export class IdentityService implements IIdentityService {
  constructor(
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  listIdentities = async (platformId: string, userId: string): Promise<Identity[]> => {
    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: PLATFORM_RESOURCE.name,
      id: platformId,
    });
    return this.identityRepository.findAll();
  };
}
