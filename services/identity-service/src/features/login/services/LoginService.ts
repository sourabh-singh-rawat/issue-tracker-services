import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type {
  ILoginService,
  LoginWithEmailAndPasswordInput,
  LoginWithEmailAndPasswordResult,
} from "@/features/login/services/ILoginService";
import type { IIdentityProvider } from "@/integrations/identity";
import type { IOAuthProvider } from "@/integrations/oauth";

@injectable()
export class LoginService implements ILoginService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.OAuthProvider)
    private readonly oauthProvider: IOAuthProvider,
  ) {}

  async loginWithEmailAndPassword(
    input: LoginWithEmailAndPasswordInput,
  ): Promise<LoginWithEmailAndPasswordResult> {
    const result = await this.identityProvider.login({
      email: input.email,
      password: input.password,
    });

    if (!input.loginChallenge) {
      return result;
    }

    const { redirectTo } = await this.oauthProvider.acceptLoginRequest({
      challenge: input.loginChallenge,
      subject: result.identity.id,
      identityProviderSessionId: result.sessionId,
    });

    return {
      ...result,
      redirectTo,
    };
  }
}
