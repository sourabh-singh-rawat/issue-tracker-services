import { UserNotFoundError } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IUserRepository } from "@/features/users/repositories/IUserRepository";
import { IUserService } from "@/features/users/services/IUserService";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundError();

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UserNotFoundError();

    return user;
  }
}
