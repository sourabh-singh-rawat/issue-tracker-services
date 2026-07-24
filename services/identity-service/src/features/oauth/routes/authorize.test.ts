import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

import { TYPES } from "@/bootstrap/container-types";
import { authorize } from "@/features/oauth/routes/authorize";
import {
  InvalidOAuthRequestError,
  OAuthProviderUnavailableError,
} from "@/integrations/oauth/errors";

describe("authorize route", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("returns redirectTo from the OAuth service", async () => {
    const authorizeFn = vi.fn().mockResolvedValue({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?client_id=issues-web",
    });
    get.mockReturnValue({ authorize: authorizeFn });

    const send = vi.fn((payload) => payload);
    const req = {
      body: {
        clientId: "issues-web",
        redirectUri: "http://localhost:3000/callback",
        responseType: "code" as const,
        scope: "openid offline",
        state: "state-1",
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
    });
    expect(response).toEqual({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?client_id=issues-web",
    });
    expect(send).toHaveBeenCalledWith({
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?client_id=issues-web",
    });
  });

  it("propagates InvalidOAuthRequestError from the OAuth service", async () => {
    const authorizeFn = vi.fn().mockRejectedValue(new InvalidOAuthRequestError());
    get.mockReturnValue({ authorize: authorizeFn });

    const send = vi.fn();
    const req = {
      body: {
        clientId: "issues-web",
        redirectUri: "http://localhost:3000/callback",
        responseType: "code" as const,
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
      body: {
        clientId: "issues-web",
        redirectUri: "http://localhost:3000/callback",
        responseType: "code" as const,
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
  // TODO: POST/GET /identity/oauth/consent routes
  it.todo("returns the consent challenge details for a valid consent_challenge");

  it.todo(
    "accepts a consent challenge with granted scopes and returns redirectTo",
  );

  it.todo(
    "rejects a consent challenge when the user denies consent and returns redirectTo",
  );

  it.todo("returns not found when the consent_challenge is unknown");
});

describe("OAuth token routes", () => {
  // TODO: POST /identity/oauth/introspect and /identity/oauth/revoke
  it.todo("introspects a bearer token and returns active status and claims");

  it.todo("revokes a token and returns success");
});
