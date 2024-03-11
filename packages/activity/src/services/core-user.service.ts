import {
  ServiceResponse,
  UserNotFoundError,
  VersionMismatchError,
} from "@sourabhrawatcc/core-utils";
import { UserService } from "./interfaces/user.service";
import { UserRepository } from "../repositories/interfaces/user.repository";
import { UserEntity } from "../app/entities";

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
