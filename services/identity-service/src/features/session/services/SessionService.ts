import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IIdentityService } from "@/features/identities/services/IIdentityService";
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
    @inject(TYPES.IdentityService)
    private readonly identityService: IIdentityService,
  ) {}

  async getIdentityFromSessionToken(sessionToken: string): Promise<Identity> {
    const idpIdentity = await this.sessionProvider.getSession(sessionToken);
    const identityId = await this.identityService.getIdByExternalId(idpIdentity.id);

    return {
      id: identityId,
      email: idpIdentity.email,
      emailVerified: idpIdentity.emailVerified ?? false,
    };
  }

  async getIdentityFromAccessToken(accessToken: string): Promise<Identity> {
    const introspection = await this.oauthTokenProvider.introspectToken(accessToken);

    if (!introspection.active || !introspection.subject) {
      throw new InvalidCredentialError("Invalid or inactive access token");
    }

    const identity = await this.identityService.getById(introspection.subject);

    const extra = introspection.extra ?? {};
    const email =
      typeof extra.email === "string" && extra.email.length > 0 ? extra.email : undefined;

    let emailVerified: boolean | undefined;
    if (typeof extra.email_verified === "boolean") {
      emailVerified = extra.email_verified;
    } else if (typeof extra.emailVerified === "boolean") {
      emailVerified = extra.emailVerified;
    }

    return {
      id: identity.id,
      email: email ?? "",
      emailVerified: emailVerified ?? false,
    };
  }
}
