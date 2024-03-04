import {
  Tokens,
  AuthCredentials,
  ServiceResponse,
} from "@sourabhrawatcc/core-utils";

export interface IdentityService {
  authenticate(credentials: AuthCredentials): Promise<ServiceResponse<Tokens>>;
  refreshToken(token: Tokens): Promise<ServiceResponse<Tokens>>;
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
