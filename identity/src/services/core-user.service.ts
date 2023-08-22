import { UserRepository } from "../data/repositories/interfaces/user-repository.interface";
import { UserUpdateDto } from "../dtos/user";
import { UserBodyDto } from "../dtos/user/post-user.dto";
import { UserDetailsDto } from "../dtos/user/user-details.dto";
import { UserService } from "./interfaces/user-service.interface";

export interface ServiceResponse<T> {
  isSuccess: boolean;
  data: T;
  dataCount?: number;
}

export class CoreUserService implements UserService {
  private readonly _userRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this._userRepository = userRepository;
  }

  createUser = async (
    user: UserBodyDto,
  ): Promise<ServiceResponse<UserDetailsDto>> => {
    const { email, password } = user;

    // Checks if the email already exists
    // Hashes the password
    // Saves the newly created user
    const createdUser = await this._userRepository.save({
      email,
      password,
    });

    const userProfile: UserDetailsDto = {
      id: createdUser.id,
      email: createdUser.email,
      isEmailVerified: createdUser.isEmailVerified,
      createdAt: createdUser.createdAt,
    };

    const serviceResponse: ServiceResponse<UserDetailsDto> = {
      data: userProfile,
      isSuccess: true,
    };

    return serviceResponse;
  };

  updateUser = async (id: string, user: UserUpdateDto) => {
    // update
    return await this._userRepository.update(id, user);
  };
}
