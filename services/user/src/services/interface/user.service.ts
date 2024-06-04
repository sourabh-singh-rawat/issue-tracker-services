import {
  AuthCredentials,
  UserDetails,
  UserRegistrationData,
} from "@issue-tracker/common";

export interface UserService {
  createUser(
    userRegistrationData: UserRegistrationData,
    inviteToken?: string,
  ): Promise<void>;
  setDefaultWorkspace(userId: string, id: string, name: string): Promise<void>;
  verifyPassword(credentials: AuthCredentials): Promise<void>;
  verifyEmail(inviteToken: string): Promise<void>;
  getUserInfoByEmail(email: string): Promise<UserDetails>;
}
