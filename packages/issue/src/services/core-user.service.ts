import {
  ServiceResponse,
  UserNotFoundError,
  VersionMismatchError,
} from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../data/entities";
import { UserService } from "./interfaces/user.service";
import { UserRepository } from "../data/repositories/interfaces/user.repository";

export class CoreUserService implements UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * Gets current user
   * @param userId
   * @throws error if user is not found
   */
  private getUserById = async (userId: string) => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundError();

    return user;
  };

  /**
   * Gets the default workspace of the user
   * @param userId
   */
  getDefaultWorkspaceId = async (userId: string) => {
    const user = await this.getUserById(userId);

    return new ServiceResponse({ rows: user.defaultWorkspaceId });
  };

  /**
   * Updates the user
   * @param userId
   * @param defaultWorkspaceId
   * @param version
   */
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
