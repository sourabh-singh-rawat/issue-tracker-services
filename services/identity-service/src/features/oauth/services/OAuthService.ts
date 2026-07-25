import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type {
  AcceptConsentOptions,
  AuthorizeOptions,
  AuthorizeResult,
  ConsentActionResult,
  ConsentChallengeResult,
  ExchangeTokenOptions,
  ExchangeTokenResult,
  IOAuthService,
  RejectConsentOptions,
} from "@/features/oauth/services/IOAuthService";
import type { IOAuthProvider } from "@/integrations/oauth";

@injectable()
export class OAuthService implements IOAuthService {
  constructor(
    @inject(TYPES.OAuthProvider)
    private readonly oauthProvider: IOAuthProvider,
  ) {}

  async authorize(params: AuthorizeOptions): Promise<AuthorizeResult> {
    const redirectTo = this.oauthProvider.getAuthorizationUrl({
      clientId: params.clientId,
      redirectUri: params.redirectUri,
      responseType: params.responseType,
      scope: params.scope,
      state: params.state,
      codeChallenge: params.codeChallenge,
      codeChallengeMethod: params.codeChallengeMethod,
      nonce: params.nonce,
    });

    return { redirectTo };
  }

  async getConsentChallenge(challenge: string): Promise<ConsentChallengeResult> {
    return this.oauthProvider.getConsentRequest(challenge);
  }

  async acceptConsent(params: AcceptConsentOptions): Promise<ConsentActionResult> {
    return this.oauthProvider.acceptConsentRequest({
      challenge: params.challenge,
      grantScope: params.grantScope,
      remember: params.remember,
      rememberFor: params.rememberFor,
    });
  }

  async rejectConsent(params: RejectConsentOptions): Promise<ConsentActionResult> {
    return this.oauthProvider.rejectConsentRequest({
      challenge: params.challenge,
      error: params.error,
      errorDescription: params.errorDescription,
    });
  }

  async exchangeToken(params: ExchangeTokenOptions): Promise<ExchangeTokenResult> {
    return this.oauthProvider.exchangeToken({
      grantType: params.grantType,
      clientId: params.clientId,
      code: params.code,
      redirectUri: params.redirectUri,
      codeVerifier: params.codeVerifier,
    });
  }
}
