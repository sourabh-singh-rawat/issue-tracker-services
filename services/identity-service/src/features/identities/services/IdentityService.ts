import { UserNotFoundError } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IIdentityRepository } from "@/features/identities/repositories/IIdentityRepository";
import { IIdentityService } from "@/features/identities/services/IIdentityService";

@injectable()
export class IdentityService implements IIdentityService {
  constructor(
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
  ) {}

  async getIdentityById(id: string) {
    const identity = await this.identityRepository.findById(id);
    if (!identity) throw new UserNotFoundError();

    return identity;
  }

  async getIdentityByIdpId(idpId: string) {
    const identity = await this.identityRepository.findByIdpId(idpId);
    if (!identity) throw new UserNotFoundError();

    return identity;
  }
}
