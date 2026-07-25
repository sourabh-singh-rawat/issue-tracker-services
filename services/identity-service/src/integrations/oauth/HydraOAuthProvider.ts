import { inject, injectable } from "inversify";
import type { OAuth2Client } from "@ory/hydra-client";
import { TYPES } from "@/bootstrap/container-types";
import axios from "axios";
import type {
  AcceptConsentInput,
  AcceptLoginInput,
  AuthorizeInput,
  ConsentChallenge,
  ExchangeTokenInput,
  IntrospectTokenResult,
  IOAuthProvider,
  LoginChallenge,
  OAuthClientInfo,
  OAuthRedirectResult,
  RegisterOAuthClientInput,
  RegisteredOAuthClient,
  RejectRequestInput,
  TokenResult,
} from "@/integrations/oauth/IOAuthProvider";
import type { HydraClient } from "@/integrations/oauth/HydraClient";
import {
  InvalidOAuthRequestError,
  OAuthProviderUnavailableError,
  OAuthRequestNotFoundError,
} from "@/integrations/oauth/errors";

@injectable()
export class HydraOAuthProvider implements IOAuthProvider {
  constructor(
    @inject(TYPES.HydraClient)
    private readonly hydra: HydraClient,
  ) {}

  getAuthorizationUrl(input: AuthorizeInput): string {
    const url = new URL("/oauth2/auth", this.hydra.publicUrl);
    url.searchParams.set("client_id", input.clientId);
    url.searchParams.set("redirect_uri", input.redirectUri);
    url.searchParams.set("response_type", input.responseType);
    url.searchParams.set("scope", input.scope);
    url.searchParams.set("state", input.state);

    if (input.codeChallenge) {
      url.searchParams.set("code_challenge", input.codeChallenge);
      url.searchParams.set("code_challenge_method", input.codeChallengeMethod ?? "S256");
    }
    if (input.nonce) {
      url.searchParams.set("nonce", input.nonce);
    }

    return url.toString();
  }

  async getLoginRequest(challenge: string): Promise<LoginChallenge> {
    try {
      const { data } = await this.hydra.adminApi.getOAuth2LoginRequest({
        loginChallenge: challenge,
      });

      return {
        challenge: data.challenge,
        skip: data.skip,
        subject: data.subject || undefined,
        client: this.mapClient(data.client),
        requestedScope: data.requested_scope ?? [],
        requestUrl: data.request_url,
        sessionId: data.session_id,
      };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async acceptLoginRequest(input: AcceptLoginInput): Promise<OAuthRedirectResult> {
    try {
      const { data } = await this.hydra.adminApi.acceptOAuth2LoginRequest({
        loginChallenge: input.challenge,
        acceptOAuth2LoginRequest: {
          subject: input.subject,
          remember: input.remember,
          remember_for: input.rememberFor,
          identity_provider_session_id: input.identityProviderSessionId,
          context: input.context,
        },
      });

      return { redirectTo: data.redirect_to };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async rejectLoginRequest(input: RejectRequestInput): Promise<OAuthRedirectResult> {
    try {
      const { data } = await this.hydra.adminApi.rejectOAuth2LoginRequest({
        loginChallenge: input.challenge,
        rejectOAuth2Request: {
          error: input.error,
          error_description: input.errorDescription,
        },
      });

      return { redirectTo: data.redirect_to };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async getConsentRequest(challenge: string): Promise<ConsentChallenge> {
    try {
      const { data } = await this.hydra.adminApi.getOAuth2ConsentRequest({
        consentChallenge: challenge,
      });

      return {
        challenge: data.challenge,
        skip: data.skip ?? false,
        subject: data.subject,
        client: this.mapClient(data.client),
        requestedScope: data.requested_scope ?? [],
        requestUrl: data.request_url,
        loginChallenge: data.login_challenge,
        loginSessionId: data.login_session_id,
      };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async acceptConsentRequest(input: AcceptConsentInput): Promise<OAuthRedirectResult> {
    try {
      const { data } = await this.hydra.adminApi.acceptOAuth2ConsentRequest({
        consentChallenge: input.challenge,
        acceptOAuth2ConsentRequest: {
          grant_scope: input.grantScope,
          remember: input.remember,
          remember_for: input.rememberFor,
          session: {
            access_token: input.accessTokenExtra,
            id_token: input.idTokenExtra,
          },
        },
      });

      return { redirectTo: data.redirect_to };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async rejectConsentRequest(input: RejectRequestInput): Promise<OAuthRedirectResult> {
    try {
      const { data } = await this.hydra.adminApi.rejectOAuth2ConsentRequest({
        consentChallenge: input.challenge,
        rejectOAuth2Request: {
          error: input.error,
          error_description: input.errorDescription,
        },
      });

      return { redirectTo: data.redirect_to };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async exchangeToken(input: ExchangeTokenInput): Promise<TokenResult> {
    const form = new URLSearchParams();
    form.set("grant_type", input.grantType);
    form.set("client_id", input.clientId);
    form.set("code", input.code);
    form.set("redirect_uri", input.redirectUri);
    form.set("code_verifier", input.codeVerifier);
    if (input.clientSecret) {
      form.set("client_secret", input.clientSecret);
    }

    try {
      const { data } = await axios.post<{
        access_token?: string;
        token_type?: string;
        expires_in?: number;
        refresh_token?: string;
        id_token?: string;
        scope?: string;
      }>(`${this.hydra.publicUrl}/oauth2/token`, form.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        validateStatus: (status) => status >= 200 && status < 300,
      });

      if (!data.access_token || !data.token_type) {
        throw new InvalidOAuthRequestError("Token response missing access_token or token_type");
      }

      return {
        accessToken: data.access_token,
        tokenType: data.token_type,
        expiresIn: data.expires_in,
        refreshToken: data.refresh_token,
        idToken: data.id_token,
        scope: data.scope,
      };
    } catch (error) {
      if (error instanceof InvalidOAuthRequestError) {
        throw error;
      }
      this.rethrowAsApplicationError(error);
    }
  }

  async introspectToken(token: string, scope?: string): Promise<IntrospectTokenResult> {
    try {
      const { data } = await this.hydra.adminApi.introspectOAuth2Token({
        token,
        scope,
      });

      return {
        active: data.active,
        subject: data.sub,
        clientId: data.client_id,
        scope: data.scope,
        expiresAt: data.exp != null ? new Date(data.exp * 1000) : undefined,
        issuedAt: data.iat != null ? new Date(data.iat * 1000) : undefined,
        audience: data.aud,
        extra: data.ext as Record<string, unknown> | undefined,
      };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async revokeToken(token: string): Promise<void> {
    try {
      await this.hydra.publicApi.revokeOAuth2Token({ token });
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async registerClient(input: RegisterOAuthClientInput): Promise<RegisteredOAuthClient> {
    const tokenEndpointAuthMethod = input.tokenEndpointAuthMethod ?? "none";
    const responseTypes = input.grantTypes.includes("authorization_code") ? ["code"] : [];

    try {
      const { data } = await this.hydra.adminApi.createOAuth2Client({
        oAuth2Client: {
          client_id: input.clientId,
          client_name: input.name,
          redirect_uris: input.redirectUris,
          grant_types: input.grantTypes,
          response_types: responseTypes,
          scope: input.scopes.join(" "),
          token_endpoint_auth_method: tokenEndpointAuthMethod,
          ...(input.clientSecret !== undefined ? { client_secret: input.clientSecret } : {}),
        },
      });

      return {
        clientId: data.client_id ?? input.clientId,
        name: data.client_name,
        redirectUris: data.redirect_uris,
        grantTypes: data.grant_types,
        scopes: data.scope?.split(/\s+/).filter(Boolean),
        clientSecret: data.client_secret,
      };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async deleteClient(providerClientId: string): Promise<void> {
    try {
      await this.hydra.adminApi.deleteOAuth2Client({ id: providerClientId });
    } catch (error) {
      if (this.getHttpStatus(error) === 404) {
        return;
      }
      this.rethrowAsApplicationError(error);
    }
  }

  private mapClient(client?: OAuth2Client): OAuthClientInfo {
    return {
      id: client?.client_id ?? "",
      name: client?.client_name,
      redirectUris: client?.redirect_uris,
    };
  }

  private rethrowAsApplicationError(error: unknown): never {
    const status = this.getHttpStatus(error);

    switch (status) {
      case 400:
      case 401:
      case 403:
        throw new InvalidOAuthRequestError();
      case 404:
        throw new OAuthRequestNotFoundError();
      default:
        if (status === undefined || status >= 500) {
          throw new OAuthProviderUnavailableError();
        }
        throw error;
    }
  }

  private getHttpStatus(error: unknown): number | undefined {
    if (typeof error !== "object" || error === null || !("response" in error)) {
      return undefined;
    }
    return (error as { response?: { status?: number } }).response?.status;
  }
}
