import {
  UserNotFoundError,
  UserProfileNotFoundError,
} from "@issue-tracker/common";
import { User, UserProfile } from "../../data/entities";
import { CreateUserProfileOptions, UserProfileService } from "./interfaces";

export class CoreUserProfileService implements UserProfileService {
  async createUserProfile(options: CreateUserProfileOptions) {
    const { manager, displayName, userId, description } = options;
    const UserProfileRepo = manager.getRepository(UserProfile);

    await UserProfileRepo.save({ displayName, userId, description });
  }

  async getUserProfileWithEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new UserNotFoundError();

    const profile = await UserProfile.findOne({
      where: { userId: user.id },
    });
    if (!profile) throw new UserProfileNotFoundError();

    return {
      userId: user.id,
      email: user.email,
      displayName: profile.displayName,
      createdAt: user.createdAt,
      emailVerificationStatus: user.emailVerificationStatus,
      defaultWorkspaceId: "some temp default Workspace",
      defaultWorkspaceName: "some default workspace name",
    };
  }
}
