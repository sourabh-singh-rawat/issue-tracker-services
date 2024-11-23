import {
  AuthCredentials,
  ServiceResponse,
  Tokens,
} from "@issue-tracker/common";

export interface IdentityService {
  authenticate(credentials: AuthCredentials): Promise<Tokens>;
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
