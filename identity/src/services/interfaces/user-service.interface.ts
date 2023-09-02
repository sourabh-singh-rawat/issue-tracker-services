import { ServiceResponseDTO } from "@sourabhrawatcc/core-utils";
import { CreateUserRequestDTO } from "../../dtos/user/create-user-request.dto";
import { UserCredentialsDTO } from "../../dtos/user";

export interface UserService {
  createUser(user: CreateUserRequestDTO): Promise<
    ServiceResponseDTO<{
      accessToken: string;
      refreshToken: string;
    }>
  >;
  loginUser(
    credentials: UserCredentialsDTO,
  ): Promise<ServiceResponseDTO<{ accessToken: string; refreshToken: string }>>;
  updateEmail(id: string, email: string): Promise<boolean>;
  // updatePassword(
  //   id: string,
  //   update: { oldPassword: string; newPassword: string },
  // ): Promise<boolean>;

  // deleteUser(): void;
  // changePassword(): void;
  // resetPassword(): void;
  // deactivateAccount(): void;
  // hashPassword(): void;
  // checkPassword(): void;
  // createAccessToken(user: UserDetailDto, exp: number): string;
}
