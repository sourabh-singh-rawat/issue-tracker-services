import type { SignInResult } from "@/integrations/identity";

export interface SignInWithEmailAndPasswordInput {
  email: string;
  password: string;
  loginChallenge?: string;
}

export interface SignInWithEmailAndPasswordResult extends SignInResult {
  redirectTo?: string;
}

export interface ISignInService {
  signInWithEmailAndPassword(
    input: SignInWithEmailAndPasswordInput,
  ): Promise<SignInWithEmailAndPasswordResult>;
}
