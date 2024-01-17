import {
  ServiceResponse,
  UserNotFoundError,
  UserUpdatedPayload,
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
  updateUser = async (payload: UserUpdatedPayload) => {
    const { id, defaultWorkspaceId, version, isEmailVerified } = payload;
    const user = await this.getUserById(id);

    if (user.version !== version) throw new VersionMismatchError();

    const updatedUser = new UserEntity();
    updatedUser.defaultWorkspaceId = defaultWorkspaceId;
    updatedUser.isEmailVerified = isEmailVerified;

    await this.userRepository.updateUser(id, updatedUser);
  };
}
