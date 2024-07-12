import { UserService } from "./interfaces/user.service";
import { UserRepository } from "../data/repositories/interfaces/user.repository";

export class CoreUserService implements UserService {
  constructor(private userRepository: UserRepository) {}

  updateUser(payload: any): Promise<void> {
    console.log(payload);
    throw new Error("Method not implemented.");
  }

  async getDefaultWorkspaceId(userId: string) {
    return await this.userRepository.findById(userId);
  }

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };
}
