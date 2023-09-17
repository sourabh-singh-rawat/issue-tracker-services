import {
  AuthCredentials,
  UserDetails,
  UserRegistrationData,
} from "@sourabhrawatcc/core-utils";

export interface UserService {
  createUser(userRegistrationData: UserRegistrationData): Promise<void>;
  verifyPassword(credentials: AuthCredentials): Promise<void>;
  getUserInfoByEmail(email: string): Promise<UserDetails>;
}
