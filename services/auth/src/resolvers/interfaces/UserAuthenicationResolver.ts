import { SignInWithEmailAndPasswordInput } from "../types";
import { RegisterUserInput } from "../types/RegisterUserInput";
import { User } from "../types/User";

export interface UserAuthenticationResolver {
  registerUser(input: RegisterUserInput): Promise<string>;
  getCurrentUser(): Promise<User>;
  signInWithEmailAndPassword(
    ctx: any,
    input: SignInWithEmailAndPasswordInput,
  ): Promise<boolean>;
}