import {
  UserNotFoundError,
  UserUpdatedPayload,
  VersionMismatchError,
} from "@sourabhrawatcc/core-utils";
import { UserService } from "./interfaces/user.service";
import { UserEntity } from "../app/entities";
import { UserRepository } from "../repositories/interface/user-repository";

export class CoreUserService implements UserService {
  constructor(private userRepository: UserRepository) {}

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

  updateUser = async (payload: UserUpdatedPayload) => {
    const { id, defaultWorkspaceId, version, isEmailVerified } = payload;

    const user = await this.getUserById(id);
    if (!user) throw new UserNotFoundError();

    if (user.version !== version) throw new VersionMismatchError();

    const updatedUser = new UserEntity();
    updatedUser.defaultWorkspaceId = defaultWorkspaceId;
    updatedUser.isEmailVerified = isEmailVerified;

    await this.userRepository.updateUser(id, updatedUser);
  };
}
