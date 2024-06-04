import { UserService } from "./interfaces/user.service";
import { UserEntity } from "../data/entities";
import {
  ServiceResponse,
  UserNotFoundError,
  VersionMismatchError,
} from "@issue-tracker/common";
import { UserRepository } from "../data/repositories/interfaces/user.repository";

export class CoreUserService implements UserService {
  constructor(private userRepository: UserRepository) {}

  private getUserById = async (userId: string) => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundError();

    return user;
  };

  getDefaultWorkspaceId = async (userId: string) => {
    const user = await this.getUserById(userId);

    return new ServiceResponse({ rows: user.defaultWorkspaceId });
  };

  updateUser = async (
    userId: string,
    defaultWorkspaceId: string,
    version: number,
  ) => {
    const user = await this.getUserById(userId);

    if (user.version !== version) throw new VersionMismatchError();

    const updatedUser = new UserEntity();
    updatedUser.defaultWorkspaceId = defaultWorkspaceId;

    await this.userRepository.updateUser(userId, updatedUser);
  };
}
