import {
  AuthCredentials,
  UserDetails,
  UserRegistrationData,
} from "@issue-tracker/common";
import { UserUpdatedPayload } from "@issue-tracker/event-bus";

export interface UserService {
  createUser(
    userRegistrationData: UserRegistrationData,
    inviteToken?: string,
  ): Promise<void>;
  updateUser(user: UserUpdatedPayload): Promise<void>;
  setDefaultWorkspace(userId: string, id: string, name: string): Promise<void>;
  verifyPassword(credentials: AuthCredentials): Promise<void>;
  verifyEmail(inviteToken: string): Promise<void>;
  getUserInfoByEmail(email: string): Promise<UserDetails>;
}
