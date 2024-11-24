import { UserService } from "./interfaces/UserService";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { User } from "../data/entities";

export class CoreUserService implements UserService {
  constructor(private userRepository: UserRepository) {}

  updateUser = async (payload: any) => {
    throw new Error("Method not implemented.");
  };

  async getDefaultWorkspaceId(userId: string) {
    const user = await User.findOneOrFail({ where: { id: userId } });

    return user.defaultWorkspaceId;
  }

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };
}
