import { CreateUserRequestDTO } from "../../dtos/user/create-user-request.dto";
import { UserDetailsDto } from "../../dtos/user/user-details.dto";
import { ServiceResponse } from "../core-user.service";

export interface UserService {
  createUser(
    user: CreateUserRequestDTO,
  ): Promise<ServiceResponse<UserDetailsDto>>;
  // getUserById(): void;
  // getUserByUsername(): void;
  updateEmail(id: string, email: string): Promise<boolean>;
  updatePassword(
    id: string,
    update: { oldPassword: string; newPassword: string },
  ): Promise<boolean>;

  // deleteUser(): void;
  // changePassword(): void;
  // resetPassword(): void;
  // deactivateAccount(): void;
  // hashPassword(): void;
  // checkPassword(): void;
}
