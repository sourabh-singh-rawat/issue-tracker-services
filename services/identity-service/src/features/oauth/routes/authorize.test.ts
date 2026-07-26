import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

import { TYPES } from "@/bootstrap/container-types";
import { acceptConsent } from "@/features/oauth/routes/acceptConsent";
import { authorize } from "@/features/oauth/routes/authorize";
import { consent } from "@/features/oauth/routes/consent";
import { rejectConsent } from "@/features/oauth/routes/rejectConsent";
import { token } from "@/features/oauth/routes/token";
import {
  InvalidOAuthRequestError,
  OAuthProviderUnavailableError,
  OAuthRequestNotFoundError,
} from "@/integrations/oauth/errors";

describe("authorize route", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("is a GET endpoint that accepts OAuth authorize query params", () => {
    expect(authorize.method).toBe("GET");
    expect(authorize.url).toBe("/identity/oauth/authorize");
    expect(authorize.schema).toMatchObject({
      querystring: expect.anything(),
    });
  });

  it("returns the authorization URL from the OAuth service", async () => {
    const authorizeFn = vi.fn().mockResolvedValue({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?client_id=issues-web",
    });
    get.mockReturnValue({ authorize: authorizeFn });

    const send = vi.fn((body) => body);
    const req = {
      query: {
        client_id: "issues-web",
        redirect_uri: "http://localhost:3000/callback",
        response_type: "code" as const,
        scope: "openid offline",
        state: "state-1",
        code_challenge: "challenge",
        code_challenge_method: "S256" as const,
        nonce: "nonce-1",
      },
    };
    const reply = { send };

    const response = await authorize.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.OAuthService);
    expect(authorizeFn).toHaveBeenCalledWith({
      clientId: "issues-web",
      redirectUri: "http://localhost:3000/callback",
      responseType: "code",
      scope: "openid offline",
      state: "state-1",
      codeChallenge: "challenge",
      codeChallengeMethod: "S256",
      nonce: "nonce-1",
    });
    expect(send).toHaveBeenCalledWith({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?client_id=issues-web",
    });
    expect(response).toEqual({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?client_id=issues-web",
    });
  });

  it("propagates InvalidOAuthRequestError from the OAuth service", async () => {
    const authorizeFn = vi.fn().mockRejectedValue(new InvalidOAuthRequestError());
    get.mockReturnValue({ authorize: authorizeFn });

    const send = vi.fn();
    const req = {
      query: {
        client_id: "issues-web",
        redirect_uri: "http://localhost:3000/callback",
        response_type: "code" as const,
        scope: "openid",
        state: "state-1",
      },
    };
    const reply = { send };

    await expect(authorize.handler!(req as never, reply as never)).rejects.toBeInstanceOf(
      InvalidOAuthRequestError,
    );
    expect(send).not.toHaveBeenCalled();
  });

  it("propagates OAuthProviderUnavailableError from the OAuth service", async () => {
    const authorizeFn = vi
      .fn()
      .mockRejectedValue(new OAuthProviderUnavailableError());
    get.mockReturnValue({ authorize: authorizeFn });

    const send = vi.fn();
    const req = {
      query: {
        client_id: "issues-web",
        redirect_uri: "http://localhost:3000/callback",
        response_type: "code" as const,
        scope: "openid",
        state: "state-1",
      },
    };
    const reply = { send };

    await expect(authorize.handler!(req as never, reply as never)).rejects.toBeInstanceOf(
      OAuthProviderUnavailableError,
    );
    expect(send).not.toHaveBeenCalled();
  });
});

describe("OAuth login challenge routes", () => {
  // TODO: POST/GET /identity/oauth/login routes
  it.todo("returns the login challenge details for a valid login_challenge");

  it.todo(
    "accepts a login challenge when the user is authenticated and returns redirectTo",
  );

  it.todo(
    "rejects a login challenge when the user denies login and returns redirectTo",
  );

  it.todo("returns not found when the login_challenge is unknown");
});

describe("OAuth consent challenge routes", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("is a GET endpoint that accepts a consent_challenge query param", () => {
    expect(consent.method).toBe("GET");
    expect(consent.url).toBe("/identity/oauth/consent");
    expect(consent.schema).toMatchObject({
      querystring: expect.anything(),
    });
  });

  it("returns the consent challenge details for a valid consent_challenge", async () => {
    const challenge = {
      challenge: "consent-challenge-1",
      skip: false,
      subject: "user-1",
      client: { id: "issues-web", name: "Issues Web" },
      requestedScope: ["openid", "offline"],
      requestUrl: "http://127.0.0.1:4444/oauth2/auth?...",
      loginChallenge: "login-challenge-1",
      loginSessionId: "login-session-1",
    };
    const getConsentChallenge = vi.fn().mockResolvedValue(challenge);
    get.mockReturnValue({ getConsentChallenge });

    const send = vi.fn((payload) => payload);
    const req = { query: { consent_challenge: "consent-challenge-1" } };
    const reply = { send };

    const response = await consent.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.OAuthService);
    expect(getConsentChallenge).toHaveBeenCalledWith("consent-challenge-1");
    expect(response).toEqual(challenge);
    expect(send).toHaveBeenCalledWith(challenge);
  });

  it("accepts a consent challenge with granted scopes and returns redirectTo", async () => {
    const acceptConsentFn = vi.fn().mockResolvedValue({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?consent_verifier=abc",
    });
    get.mockReturnValue({ acceptConsent: acceptConsentFn });

    const send = vi.fn((payload) => payload);
    const req = {
      query: { consent_challenge: "consent-challenge-1" },
      body: { grantScope: ["openid", "offline"], remember: true, rememberFor: 3600 },
    };
    const reply = { send };

    const response = await acceptConsent.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.OAuthService);
    expect(acceptConsentFn).toHaveBeenCalledWith({
      challenge: "consent-challenge-1",
      grantScope: ["openid", "offline"],
      remember: true,
      rememberFor: 3600,
    });
    expect(response).toEqual({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?consent_verifier=abc",
    });
    expect(acceptConsent.method).toBe("POST");
    expect(acceptConsent.url).toBe("/identity/oauth/consent/accept");
  });

  it("rejects a consent challenge when the user denies consent and returns redirectTo", async () => {
    const rejectConsentFn = vi.fn().mockResolvedValue({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?error=access_denied",
    });
    get.mockReturnValue({ rejectConsent: rejectConsentFn });

    const send = vi.fn((payload) => payload);
    const req = {
      query: { consent_challenge: "consent-challenge-1" },
      body: { error: "access_denied", errorDescription: "User denied consent" },
    };
    const reply = { send };

    const response = await rejectConsent.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.OAuthService);
    expect(rejectConsentFn).toHaveBeenCalledWith({
      challenge: "consent-challenge-1",
      error: "access_denied",
      errorDescription: "User denied consent",
    });
    expect(response).toEqual({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?error=access_denied",
    });
    expect(rejectConsent.method).toBe("POST");
    expect(rejectConsent.url).toBe("/identity/oauth/consent/reject");
  });

  it("returns not found when the consent_challenge is unknown", async () => {
    const getConsentChallenge = vi
      .fn()
      .mockRejectedValue(new OAuthRequestNotFoundError());
    get.mockReturnValue({ getConsentChallenge });

    const send = vi.fn();
    const req = { query: { consent_challenge: "missing" } };
    const reply = { send };

    await expect(consent.handler!(req as never, reply as never)).rejects.toBeInstanceOf(
      OAuthRequestNotFoundError,
    );
    expect(send).not.toHaveBeenCalled();
  });
});

describe("token route", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("is a POST endpoint for exchanging an authorization code", () => {
    expect(token.method).toBe("POST");
    expect(token.url).toBe("/identity/oauth/token");
    expect(token.schema).toMatchObject({
      body: expect.anything(),
    });
  });

  it("exchanges a code via the OAuth service and sets tokens as HTTP-only cookies", async () => {
    const exchangeToken = vi.fn().mockResolvedValue({
      accessToken: "access-1",
      tokenType: "bearer",
      expiresIn: 3600,
      refreshToken: "refresh-1",
      idToken: "id-1",
      scope: "openid offline",
    });
    get.mockReturnValue({ exchangeToken });

    const setCookie = vi.fn();
    const send = vi.fn((payload) => payload);
    const req = {
      body: {
        grant_type: "authorization_code",
        code: "auth-code-1",
        client_id: "inventory-web",
        redirect_uri: "http://localhost:3001/callback",
        code_verifier: "verifier-1",
      },
    };
    const reply = { setCookie, send };

    const response = await token.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.OAuthService);
    expect(exchangeToken).toHaveBeenCalledWith({
      grantType: "authorization_code",
      code: "auth-code-1",
      clientId: "inventory-web",
      redirectUri: "http://localhost:3001/callback",
      codeVerifier: "verifier-1",
    });

    expect(setCookie).toHaveBeenCalledWith(
      "accessToken",
      "access-1",
      expect.objectContaining({
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
        expires: expect.any(Date),
      }),
    );
    expect(setCookie).toHaveBeenCalledWith("refreshToken", "refresh-1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
    });
    expect(setCookie).toHaveBeenCalledWith(
      "idToken",
      "id-1",
      expect.objectContaining({
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
        expires: expect.any(Date),
      }),
    );
    expect(response).toEqual({
      message: "Tokens issued successfully.",
    });
    expect(send).toHaveBeenCalledWith({
      message: "Tokens issued successfully.",
    });
  });

  it("propagates InvalidOAuthRequestError from the OAuth service", async () => {
    const exchangeToken = vi.fn().mockRejectedValue(new InvalidOAuthRequestError());
    get.mockReturnValue({ exchangeToken });

    const setCookie = vi.fn();
    const send = vi.fn();
    const req = {
      body: {
        grant_type: "authorization_code",
        code: "bad-code",
        client_id: "inventory-web",
        redirect_uri: "http://localhost:3001/callback",
        code_verifier: "verifier-1",
      },
    };
    const reply = { setCookie, send };

    await expect(token.handler!(req as never, reply as never)).rejects.toBeInstanceOf(
      InvalidOAuthRequestError,
    );
    expect(setCookie).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});


describe("OAuth introspect/revoke routes", () => {
  // TODO: POST /identity/oauth/introspect and /identity/oauth/revoke
  it.todo("introspects a bearer token and returns active status and claims");

  it.todo("revokes a token and returns success");
});
