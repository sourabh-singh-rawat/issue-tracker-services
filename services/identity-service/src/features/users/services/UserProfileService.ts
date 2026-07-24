import { UserNotFoundError, UserProfileNotFoundError } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IUserProfileRepository } from "@/features/users/repositories/IUserProfileRepository";
import { IUserRepository } from "@/features/users/repositories/IUserRepository";
import {
  CreateUserProfileOptions,
  IUserProfileService,
} from "@/features/users/services/IUserProfileService";

@injectable()
export class UserProfileService implements IUserProfileService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.UserProfileRepository)
    private readonly userProfileRepository: IUserProfileRepository,
  ) {}

  async createUserProfile(options: CreateUserProfileOptions) {
    const { manager, displayName, userId, description } = options;

    await this.userProfileRepository.save({ displayName, userId, description }, { manager });
  }

  async getUserProfileByUserId(userId: string) {
    const profile = await this.userProfileRepository.findByUserId(userId);
    if (!profile) throw new UserProfileNotFoundError();

    return profile;
  }

  async getUserProfileWithEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UserNotFoundError();

    const profile = await this.userProfileRepository.findByUserId(user.id);
    if (!profile) throw new UserProfileNotFoundError();

    return {
      userId: user.id,
      email: user.email,
      idpId: user.idpId,
      idpProvider: user.idpProvider,
      displayName: profile.displayName,
      description: profile.description,
      photoUrl: profile.photoUrl,
      createdAt: user.createdAt,
    };
  }
}
