import {
  QueryBuilderOptions,
  UserNotFoundError,
  VersionMismatch,
} from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../data/entities";
import { UserService } from "./interfaces/user.service";
import { UserRepository } from "../data/repositories/interface/user-repository";

export class CoreUserService implements UserService {
  constructor(private userRepository: UserRepository) {}

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

  updateUser = async (
    userId: string,
    defaultWorkspaceId: string,
    version: number,
    options?: QueryBuilderOptions,
  ) => {
    const user = await this.getUserById(userId);
    if (!user) throw new UserNotFoundError();

    if (user.version !== version) throw new VersionMismatch();

    const updatedUser = new UserEntity();
    updatedUser.defaultWorkspaceId = defaultWorkspaceId;

    await this.userRepository.updateUser(userId, updatedUser);
  };
}
