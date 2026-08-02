import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { ISessionProvider } from "@/integrations/identity/ISessionProvider";
import type { KratosClient } from "@/integrations/identity/KratosClient";
import type { KratosErrorMapper } from "@/integrations/identity/KratosErrorMapper";
import { mapKratosIdentity } from "@/integrations/identity/mapKratosIdentity";
import type {
  Identity,
  SignInIdentityInput,
  SignInResult,
} from "@/integrations/identity/types";
import {
  IdentityProviderUnavailableError,
  InvalidCredentialError,
} from "@/integrations/identity/errors";

@injectable()
export class KratosSessionProvider implements ISessionProvider {
  constructor(
    @inject(TYPES.KratosClient)
    private readonly kratos: KratosClient,
    @inject(TYPES.KratosErrorMapper)
    private readonly errors: KratosErrorMapper,
  ) {}

  async signIn(input: SignInIdentityInput): Promise<SignInResult> {
    try {
      const { data: flow } = await this.kratos.frontendApi.createNativeLoginFlow();

      const { data } = await this.kratos.frontendApi.updateLoginFlow({
        flow: flow.id,
        updateLoginFlowBody: {
          method: "password",
          identifier: input.email,
          password: input.password,
        },
      });

      const session = data.session;
      const sessionIdentity = session.identity;
      const sessionToken = data.session_token;
      const expiresAt = session.expires_at;

      if (!sessionIdentity || !sessionToken || !expiresAt) {
        throw new IdentityProviderUnavailableError();
      }

      const identity = mapKratosIdentity(sessionIdentity, input.email);

      return {
        identity: {
          id: identity.id,
          email: identity.email,
          emailVerified: identity.emailVerified,
        },
        sessionToken,
        sessionId: session.id,
        expiresAt: new Date(expiresAt),
      };
    } catch (error) {
      if (error instanceof IdentityProviderUnavailableError) {
        throw error;
      }
      this.errors.rethrow(error);
    }
  }

  async logout(sessionToken: string): Promise<void> {
    try {
      await this.kratos.frontendApi.performNativeLogout({
        performNativeLogoutBody: {
          session_token: sessionToken,
        },
      });
    } catch (error) {
      this.errors.rethrow(error);
    }
  }

  async getSession(sessionToken: string): Promise<Identity> {
    try {
      const { data: session } = await this.kratos.frontendApi.toSession({
        xSessionToken: sessionToken,
      });

      const sessionIdentity = session.identity;
      if (!sessionIdentity) {
        throw new InvalidCredentialError("No active session");
      }

      return mapKratosIdentity(sessionIdentity);
    } catch (error) {
      if (error instanceof InvalidCredentialError) {
        throw error;
      }
      this.errors.rethrow(error);
    }
  }
}
