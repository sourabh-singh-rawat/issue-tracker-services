import { UserProfile } from "../data/entities";
import { CreateUserProfileOptions, UserProfileService } from "./Interfaces";

export class CoreUserProfileService implements UserProfileService {
  async createUserProfile(options: CreateUserProfileOptions) {
    const { manager, displayName, userId, description } = options;
    const UserProfileRepo = manager.getRepository(UserProfile);

    await UserProfileRepo.save({ displayName, userId, description });
  }
}
