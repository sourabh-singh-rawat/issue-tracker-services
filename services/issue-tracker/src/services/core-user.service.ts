import { UserService } from "./interfaces/user.service";
import { UserEntity } from "../data/entities";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { UserUpdatedPayload } from "@issue-tracker/event-bus";
import { UserNotFoundError, VersionMismatchError } from "@issue-tracker/common";

export class CoreUserService implements UserService {
  constructor(private userRepository: UserRepository) {}
  async getDefaultWorkspaceId(userId: string) {
    return await this.userRepository.findById(userId);
  }

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

  updateUser = async (payload: UserUpdatedPayload) => {
    const { id, version, isEmailVerified } = payload;

    const user = await this.getUserById(id);
    if (!user) throw new UserNotFoundError();

    if (user.version !== version) throw new VersionMismatchError();

    const updatedUser = new UserEntity();
    updatedUser.isEmailVerified = isEmailVerified;

    await this.userRepository.updateUser(id, updatedUser);
  };
}
