import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { ILoginService } from "@/features/login/services/ILoginService";
import type { IIdentityProvider, LoginResult } from "@/integrations/identity";

@injectable()
export class LoginService implements ILoginService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
  ) {}

  async loginWithEmailAndPassword(email: string, password: string): Promise<LoginResult> {
    return this.identityProvider.login({ email, password });
  }
}
