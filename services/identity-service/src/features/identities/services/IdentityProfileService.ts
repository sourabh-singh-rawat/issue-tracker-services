import { UserNotFoundError, UserProfileNotFoundError } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IIdentityProfileRepository } from "@/features/identities/repositories/IIdentityProfileRepository";
import { IIdentityRepository } from "@/features/identities/repositories/IIdentityRepository";
import {
  CreateIdentityProfileOptions,
  IIdentityProfileService,
} from "@/features/identities/services/IIdentityProfileService";

@injectable()
export class IdentityProfileService implements IIdentityProfileService {
  constructor(
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
    @inject(TYPES.IdentityProfileRepository)
    private readonly identityProfileRepository: IIdentityProfileRepository,
  ) {}

  async createIdentityProfile(options: CreateIdentityProfileOptions) {
    const { tx, displayName, identityId, description } = options;

    await this.identityProfileRepository.save(
      { displayName, identityId, description },
      { tx },
    );
  }

  async getIdentityProfileByIdentityId(identityId: string) {
    const profile = await this.identityProfileRepository.findByIdentityId(identityId);
    if (!profile) throw new UserProfileNotFoundError();

    return profile;
  }

  async getIdentityProfileWithEmail(email: string) {
    const identity = await this.identityRepository.findByEmail(email);
    if (!identity) throw new UserNotFoundError();

    const profile = await this.identityProfileRepository.findByIdentityId(identity.id);
    if (!profile) throw new UserProfileNotFoundError();

    return {
      identityId: identity.id,
      email: identity.email,
      idpId: identity.idpId,
      idpProvider: identity.idpProvider,
      displayName: profile.displayName,
      description: profile.description,
      photoUrl: profile.photoUrl,
      createdAt: identity.createdAt,
    };
  }
}
