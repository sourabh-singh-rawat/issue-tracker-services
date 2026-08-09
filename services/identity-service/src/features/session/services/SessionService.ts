import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { ISessionService } from "@/features/session/services/ISessionService";
import type { ISessionProvider, Identity } from "@/integrations/identity";
import { InvalidCredentialError } from "@/integrations/identity";
import type { IOAuthTokenProvider } from "@/integrations/oauth";

@injectable()
export class SessionService implements ISessionService {
  constructor(
    @inject(TYPES.SessionProvider)
    private readonly sessionProvider: ISessionProvider,
    @inject(TYPES.OAuthTokenProvider)
    private readonly oauthTokenProvider: IOAuthTokenProvider,
  ) {}

  async getSession(sessionToken: string): Promise<Identity> {
    return this.sessionProvider.getSession(sessionToken);
  }

  async getSessionFromAccessToken(accessToken: string): Promise<Identity> {
    const introspection = await this.oauthTokenProvider.introspectToken(accessToken);

    if (!introspection.active || !introspection.subject) {
      throw new InvalidCredentialError("Invalid or inactive access token");
    }

    const extra = introspection.extra ?? {};
    const email =
      typeof extra.email === "string" && extra.email.length > 0 ? extra.email : undefined;
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
