import { UserProfileNotFoundError } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Profile } from "@/db";
import type { IProfileRepository } from "@/features/profiles/repositories/IProfileRepository";
import type {
  CreateProfileOptions,
  IProfileService,
  UpdateGenderOptions,
  UpdateNameOptions,
} from "@/features/profiles/services/IProfileService";

@injectable()
export class ProfileService implements IProfileService {
  constructor(
    @inject(TYPES.ProfileRepository)
    private readonly profileRepository: IProfileRepository,
  ) {}

  async create(options: CreateProfileOptions) {
    const { tx, firstName, middleName, lastName, identityId, description } = options;

    await this.profileRepository.save(
      { firstName, middleName, lastName, identityId, description },
      { tx },
    );
  }

  async getByIdentityId(identityId: string) {
    const profile = await this.profileRepository.findByIdentityId(identityId);
    if (!profile) throw new UserProfileNotFoundError();

    return profile;
  }

  async updateName(options: UpdateNameOptions): Promise<Profile> {
    const profile = await this.profileRepository.findByIdentityId(options.identityId);
    if (!profile) throw new UserProfileNotFoundError();

    return this.profileRepository.update(profile.id, {
      firstName: options.firstName,
      middleName: options.middleName ?? null,
      lastName: options.lastName ?? null,
    });
  }

  async updateGender(options: UpdateGenderOptions): Promise<Profile> {
    const profile = await this.profileRepository.findByIdentityId(options.identityId);
    if (!profile) throw new UserProfileNotFoundError();

    return this.profileRepository.update(profile.id, {
      gender: options.gender,
    });
  }
}
