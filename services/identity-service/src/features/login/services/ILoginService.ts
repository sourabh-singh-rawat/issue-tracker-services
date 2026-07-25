import type { LoginResult } from "@/integrations/identity";

export interface LoginWithEmailAndPasswordInput {
  email: string;
  password: string;
  loginChallenge?: string;
}

export interface LoginWithEmailAndPasswordResult extends LoginResult {
  redirectTo?: string;
}

export interface ILoginService {
  loginWithEmailAndPassword(
    input: LoginWithEmailAndPasswordInput,
  ): Promise<LoginWithEmailAndPasswordResult>;
}
