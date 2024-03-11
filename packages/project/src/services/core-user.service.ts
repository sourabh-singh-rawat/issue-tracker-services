import {
  ServiceResponse,
  UserNotFoundError,
  UserUpdatedPayload,
  VersionMismatchError,
} from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../app/entities";
import { UserService } from "./interfaces/user.service";
import { UserRepository } from "../repositories/interfaces/user.repository";

export class CoreUserService implements UserService {
  constructor(private userRepository: UserRepository) {}

  private getUserById = async (userId: string) => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundError();

    return user;
  };

  getDefaultWorkspaceId = async (userId: string) => {
    const user = await this.getUserById(userId);

    return user.defaultWorkspaceId;
  };

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
