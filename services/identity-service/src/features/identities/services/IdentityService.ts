import { UserNotFoundError } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IIdentityRepository } from "@/features/identities/repositories/IIdentityRepository";
import {
  IIdentityService,
  toPublicIdentity,
} from "@/features/identities/services/IIdentityService";

@injectable()
export class IdentityService implements IIdentityService {
  constructor(
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
  ) {}

  async getById(id: string) {
    const identity = await this.identityRepository.findById(id);
    if (!identity) throw new UserNotFoundError();

    return toPublicIdentity(identity);
  }

  async getIdByExternalId(externalId: string) {
    const identity = await this.identityRepository.findByIdpId(externalId);
    if (!identity) throw new UserNotFoundError();

    return identity.id;
  }
}
