import { describe, it, expect, vi } from "vitest";
import { InvalidOAuthRequestError } from "@/integrations/oauth/errors";
import { OAuthService } from "@/features/oauth/services/OAuthService";

function createOAuthProviderMock(
  overrides: Partial<{
    getAuthorizationUrl: ReturnType<typeof vi.fn>;
    getLoginRequest: ReturnType<typeof vi.fn>;
    acceptLoginRequest: ReturnType<typeof vi.fn>;
    rejectLoginRequest: ReturnType<typeof vi.fn>;
    getConsentRequest: ReturnType<typeof vi.fn>;
    acceptConsentRequest: ReturnType<typeof vi.fn>;
    rejectConsentRequest: ReturnType<typeof vi.fn>;
    introspectToken: ReturnType<typeof vi.fn>;
    revokeToken: ReturnType<typeof vi.fn>;
  }> = {},
) {
  return {
    getAuthorizationUrl: overrides.getAuthorizationUrl ?? vi.fn(),
    getLoginRequest: overrides.getLoginRequest ?? vi.fn(),
    acceptLoginRequest: overrides.acceptLoginRequest ?? vi.fn(),
    rejectLoginRequest: overrides.rejectLoginRequest ?? vi.fn(),
    getConsentRequest: overrides.getConsentRequest ?? vi.fn(),
    acceptConsentRequest: overrides.acceptConsentRequest ?? vi.fn(),
    rejectConsentRequest: overrides.rejectConsentRequest ?? vi.fn(),
    introspectToken: overrides.introspectToken ?? vi.fn(),
    revokeToken: overrides.revokeToken ?? vi.fn(),
  };
}

describe("OAuthService.authorize", () => {
  it("builds the authorization URL via the OAuth provider", async () => {
    const getAuthorizationUrl = vi
      .fn()
      .mockReturnValue("http://127.0.0.1:4444/oauth2/auth?client_id=issues-web");
    const oauthProvider = createOAuthProviderMock({ getAuthorizationUrl });

    const service = new OAuthService(oauthProvider as never);

    await expect(
      service.authorize({
        clientId: "issues-web",
        redirectUri: "http://localhost:3000/callback",
        responseType: "code",
        scope: "openid offline",
        state: "state-1",
      }),
    ).resolves.toEqual({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?client_id=issues-web",
    });

    expect(getAuthorizationUrl).toHaveBeenCalledTimes(1);
    expect(getAuthorizationUrl).toHaveBeenCalledWith({
      clientId: "issues-web",
      redirectUri: "http://localhost:3000/callback",
      responseType: "code",
      scope: "openid offline",
      state: "state-1",
      codeChallenge: undefined,
      codeChallengeMethod: undefined,
      nonce: undefined,
    });
  });

  it("forwards codeChallenge, codeChallengeMethod, and nonce to the OAuth provider", async () => {
    const getAuthorizationUrl = vi
      .fn()
      .mockReturnValue("http://127.0.0.1:4444/oauth2/auth?client_id=issues-web");
    const service = new OAuthService(
      createOAuthProviderMock({ getAuthorizationUrl }) as never,
    );

    await service.authorize({
      clientId: "issues-web",
      redirectUri: "http://localhost:3000/callback",
      responseType: "code",
      scope: "openid offline",
      state: "state-1",
      codeChallenge: "challenge",
      codeChallengeMethod: "S256",
      nonce: "nonce-1",
    });

    expect(getAuthorizationUrl).toHaveBeenCalledWith({
      clientId: "issues-web",
      redirectUri: "http://localhost:3000/callback",
      responseType: "code",
      scope: "openid offline",
      state: "state-1",
      codeChallenge: "challenge",
      codeChallengeMethod: "S256",
      nonce: "nonce-1",
    });
  });

  it("returns the redirect URL produced by the provider without modification", async () => {
    const redirectTo =
      "http://127.0.0.1:4444/oauth2/auth?client_id=issues-web&state=abc&scope=openid";
    const getAuthorizationUrl = vi.fn().mockReturnValue(redirectTo);
    const service = new OAuthService(
      createOAuthProviderMock({ getAuthorizationUrl }) as never,
    );

    await expect(
      service.authorize({
        clientId: "issues-web",
        redirectUri: "http://localhost:3000/callback",
        responseType: "code",
        scope: "openid",
        state: "abc",
      }),
    ).resolves.toEqual({ redirectTo });
  });

  it("propagates provider errors during authorize", async () => {
    const getAuthorizationUrl = vi.fn().mockImplementation(() => {
      throw new InvalidOAuthRequestError();
    });
    const service = new OAuthService(
      createOAuthProviderMock({ getAuthorizationUrl }) as never,
    );

    await expect(
      service.authorize({
        clientId: "issues-web",
        redirectUri: "http://localhost:3000/callback",
        responseType: "code",
        scope: "openid",
        state: "state-1",
      }),
    ).rejects.toBeInstanceOf(InvalidOAuthRequestError);
  });

});

describe("OAuthService login challenge flow", () => {
  // TODO: implement OAuthService.getLoginChallenge / handleLoginChallenge
  it.todo("loads a login challenge from the OAuth provider by challenge id");

  it.todo(
    "accepts a login challenge for an authenticated subject and returns redirectTo",
  );

  it.todo(
    "accepts a login challenge with remember / rememberFor and identity provider session id",
  );

  it.todo(
    "auto-accepts a skipable login challenge when the subject already has a session",
  );

  it.todo(
    "rejects a login challenge with an error code and description and returns redirectTo",
  );

  it.todo(
    "propagates OAuthRequestNotFoundError when the login challenge is unknown",
  );

  it.todo(
    "propagates InvalidOAuthRequestError when the login challenge is invalid",
  );

  it.todo(
    "propagates OAuthProviderUnavailableError when the OAuth provider is down",
  );
});

describe("OAuthService consent challenge flow", () => {
  // TODO: implement OAuthService.getConsentChallenge / handleConsentChallenge
  it.todo("loads a consent challenge from the OAuth provider by challenge id");

  it.todo(
    "accepts a consent challenge with granted scopes and returns redirectTo",
  );

  it.todo(
    "accepts consent with remember, accessTokenExtra, and idTokenExtra claims",
  );

  it.todo(
    "auto-accepts a skipable consent challenge with previously granted scopes",
  );

  it.todo(
    "rejects a consent challenge with an error code and description and returns redirectTo",
  );

  it.todo(
    "propagates OAuthRequestNotFoundError when the consent challenge is unknown",
  );

  it.todo(
    "propagates InvalidOAuthRequestError when the consent challenge is invalid",
  );

  it.todo(
    "propagates OAuthProviderUnavailableError when the OAuth provider is down",
  );
});

describe("OAuthService token operations", () => {
  // TODO: implement OAuthService.introspectToken / revokeToken
  it.todo("introspects an access token and returns the mapped result");

  it.todo("introspects an access token with an optional required scope");

  it.todo("returns inactive when the token is expired or revoked");

  it.todo("revokes an access or refresh token via the OAuth provider");

  it.todo(
    "propagates OAuthProviderUnavailableError when token operations fail",
  );
});
