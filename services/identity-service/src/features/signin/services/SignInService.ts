import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IIdentityService } from "@/features/identities/services/IIdentityService";
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
    @inject(TYPES.IdentityService)
    private readonly identityService: IIdentityService,
  ) {}

  async signInWithEmailAndPassword(
    input: SignInWithEmailAndPasswordInput,
  ): Promise<SignInWithEmailAndPasswordResult> {
    const result = await this.sessionProvider.signIn({
      email: input.email,
      password: input.password,
    });

    const identity = await this.identityService.getIdentityByIdpId(result.identity.id);
    const resolved = {
      ...result,
      identity: {
        id: identity.id,
        email: result.identity.email,
        emailVerified: result.identity.emailVerified,
      },
    };

    if (!input.loginChallenge) {
      return resolved;
    }

    const { redirectTo } = await this.oauthFlowProvider.acceptLoginRequest({
      challenge: input.loginChallenge,
      subject: identity.id,
      identityProviderSessionId: result.sessionId,
    });

    return {
      ...resolved,
      redirectTo,
    };
  }
}
