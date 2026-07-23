import type { LoginResult } from "@/integrations/identity";

export interface ILoginService {
  loginWithEmailAndPassword(email: string, password: string): Promise<LoginResult>;
}
