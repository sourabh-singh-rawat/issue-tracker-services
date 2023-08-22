import { UserEntity } from "../../data/entities";
import { UserUpdateDto } from "../../dtos/user";
import { UserBodyDto } from "../../dtos/user/post-user.dto";
import { UserDetailsDto } from "../../dtos/user/user-details.dto";
import { ServiceResponse } from "../core-user.service";

export interface UserService {
  createUser(user: UserBodyDto): Promise<ServiceResponse<UserDetailsDto>>;
  // getUserById(): void;
  // getUserByUsername(): void;
  updateUser(id: string, user: UserUpdateDto): Promise<UserEntity>;
  // deleteUser(): void;
  // changePassword(): void;
  // resetPassword(): void;
  // deactivateAccount(): void;
  // hashPassword(): void;
  // checkPassword(): void;
}
