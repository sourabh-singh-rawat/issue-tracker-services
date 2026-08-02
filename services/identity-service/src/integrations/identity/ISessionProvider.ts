import type {
  Identity,
  SignInIdentityInput,
  SignInResult,
} from "@/integrations/identity/types";

export interface ISessionProvider {
  signIn(input: SignInIdentityInput): Promise<SignInResult>;
  logout(sessionToken: string): Promise<void>;
  getSession(sessionToken: string): Promise<Identity>;
}
