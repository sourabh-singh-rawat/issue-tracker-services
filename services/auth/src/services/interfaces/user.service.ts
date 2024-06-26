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
  getUserInfoByEmail(email: string): Promise<UserDetails>;
  updateUser(user: UserUpdatedPayload): Promise<void>;
  verifyPassword(credentials: AuthCredentials): Promise<void>;
  verifyEmail(inviteToken: string): Promise<void>;
}
