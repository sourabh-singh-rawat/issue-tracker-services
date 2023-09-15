import {
  Tokens,
  AuthCredentials,
  ServiceResponse,
} from "@sourabhrawatcc/core-utils";

export interface UserService {
  createUser(credentials: AuthCredentials): Promise<ServiceResponse<Tokens>>;
  authenticate(credentials: AuthCredentials): Promise<ServiceResponse<Tokens>>;
  refreshToken(token: Tokens): Promise<ServiceResponse<Tokens>>;
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
