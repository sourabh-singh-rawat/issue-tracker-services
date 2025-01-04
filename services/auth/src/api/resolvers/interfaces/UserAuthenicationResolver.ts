import { AppContext } from "@issue-tracker/server-core";
import {
  SignInWithEmailAndPasswordInput,
  VerifyVerificationLinkInput,
} from "../types";
import { RegisterUserInput } from "../types/RegisterUserInput";
import { User } from "../types/User";

export interface UserAuthenticationResolver {
  registerUser(input: RegisterUserInput): Promise<string>;
  getCurrentUser(ctx: AppContext): Promise<User>;
  signInWithEmailAndPassword(
    ctx: AppContext,
    input: SignInWithEmailAndPasswordInput,
  ): Promise<boolean>;
  verifyVerificationLink(input: VerifyVerificationLinkInput): Promise<string>;
  logout(ctx: AppContext): Promise<string>;
}
