import {
  UserNotFoundError,
  VersionMismatchError,
} from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../data/entities";
import { UserService } from "./interfaces/user.service";
import { RegisteredServices } from "../app/service-container";

export class CoreUserService implements UserService {
  private readonly userRepository;

  constructor(serviceController: RegisteredServices) {
    this.userRepository = serviceController.userRepository;
  }

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

  updateUser = async (
    userId: string,
    defaultWorkspaceId: string,
    version: number,
  ) => {
    const user = await this.getUserById(userId);
    if (!user) throw new UserNotFoundError();

    console.log(user.version, version);
    if (user.version !== version) throw new VersionMismatchError();

    const updatedUser = new UserEntity();
    updatedUser.defaultWorkspaceId = defaultWorkspaceId;

    await this.userRepository.updateUser(userId, updatedUser);
  };
}
