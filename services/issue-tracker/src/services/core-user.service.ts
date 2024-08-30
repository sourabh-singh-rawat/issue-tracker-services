import { UserService } from "./interfaces/user.service";
import { UserRepository } from "../data/repositories/interfaces/user.repository";

export class CoreUserService implements UserService {
  constructor(private userRepository: UserRepository) {}

  updateUser = async (payload: any) => {
    console.log(payload);
    throw new Error("Method not implemented.");
  };

  getDefaultWorkspaceId = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };
}
