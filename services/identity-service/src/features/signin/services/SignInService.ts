import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type {
  ISignInService,
  SignInWithEmailAndPasswordInput,
  SignInWithEmailAndPasswordResult,
} from "@/features/signin/services/ISignInService";
import type { ISessionProvider } from "@/integrations/identity";
import type { IOAuthFlowProvider } from "@/integrations/oauth";

@injectable()
export class SignInService implements ISignInService {
  constructor(
    @inject(TYPES.SessionProvider)
    private readonly sessionProvider: ISessionProvider,
    @inject(TYPES.OAuthFlowProvider)
    private readonly oauthFlowProvider: IOAuthFlowProvider,
  ) {}

  async signInWithEmailAndPassword(
    input: SignInWithEmailAndPasswordInput,
  ): Promise<SignInWithEmailAndPasswordResult> {
    const result = await this.sessionProvider.signIn({
      email: input.email,
      password: input.password,
    });

    if (!input.loginChallenge) {
      return result;
    }

    const { redirectTo } = await this.oauthFlowProvider.acceptLoginRequest({
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
