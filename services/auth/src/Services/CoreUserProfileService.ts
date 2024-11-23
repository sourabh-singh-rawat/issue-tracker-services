import {
  UserNotFoundError,
  UserProfileNotFoundError,
} from "@issue-tracker/common";
import { dataSource } from "..";
import { User, UserProfile } from "../data/entities";
import { CreateUserProfileOptions, UserProfileService } from "./Interfaces";

export class CoreUserProfileService implements UserProfileService {
  async createUserProfile(options: CreateUserProfileOptions) {
    const { manager, displayName, userId, description } = options;
    const UserProfileRepo = manager.getRepository(UserProfile);

    await UserProfileRepo.save({ displayName, userId, description });
  }

  async getUserProfileWithEmail(email: string) {
    const UserRepo = dataSource.getRepository(User);
    const UserProfileRepo = dataSource.getRepository(UserProfile);

    const user = await UserRepo.findOne({ where: { email } });
    if (!user) throw new UserNotFoundError();

    const profile = await UserProfileRepo.findOne({
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
