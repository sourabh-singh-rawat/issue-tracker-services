import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { ISessionService } from "@/features/session/services/ISessionService";
import type { IIdentityProvider, Identity } from "@/integrations/identity";
import { InvalidCredentialError } from "@/integrations/identity";
import type { IOAuthProvider } from "@/integrations/oauth";

@injectable()
export class SessionService implements ISessionService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.OAuthProvider)
    private readonly oauthProvider: IOAuthProvider,
  ) {}

  async getSession(sessionToken: string): Promise<Identity> {
    return this.identityProvider.getSession(sessionToken);
  }

  async getSessionFromAccessToken(accessToken: string): Promise<Identity> {
    const introspection = await this.oauthProvider.introspectToken(accessToken);

    if (!introspection.active || !introspection.subject) {
      throw new InvalidCredentialError("Invalid or inactive access token");
    }

    const extra = introspection.extra ?? {};
    const email = typeof extra.email === "string" && extra.email.length > 0 ? extra.email : undefined;
    const emailVerified =
      typeof extra.email_verified === "boolean"
        ? extra.email_verified
        : typeof extra.emailVerified === "boolean"
          ? extra.emailVerified
          : undefined;

    return {
      id: introspection.subject,
      email: email ?? "",
      emailVerified,
    };
  }
}
