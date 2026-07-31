import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type {
  ISignInService,
  SignInWithEmailAndPasswordInput,
  SignInWithEmailAndPasswordResult,
} from "@/features/signin/services/ISignInService";
import type { IIdentityProvider } from "@/integrations/identity";
import type { IOAuthProvider } from "@/integrations/oauth";

@injectable()
export class SignInService implements ISignInService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.OAuthProvider)
    private readonly oauthProvider: IOAuthProvider,
  ) {}

  async signInWithEmailAndPassword(
    input: SignInWithEmailAndPasswordInput,
  ): Promise<SignInWithEmailAndPasswordResult> {
    const result = await this.identityProvider.signIn({
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
