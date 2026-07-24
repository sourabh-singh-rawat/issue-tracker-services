import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type {
  AuthorizeOptions,
  AuthorizeResult,
  IOAuthService,
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
    });

    return { redirectTo };
  }
}
