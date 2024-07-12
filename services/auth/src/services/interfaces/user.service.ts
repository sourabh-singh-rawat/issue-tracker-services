import {
  AuthCredentials,
  UserDetails,
  UserRegistrationData,
  UserUpdateData,
} from "@issue-tracker/common";

export interface UserService {
  createUser(
    userRegistrationData: UserRegistrationData,
    inviteToken?: string,
  ): Promise<void>;
  getUserInfoByEmail(email: string): Promise<UserDetails>;
  update(id: string, user: UserUpdateData): Promise<void>;
  verifyPassword(credentials: AuthCredentials): Promise<void>;
  verifyEmail(userId: string, inviteToken: string): Promise<void>;
}
