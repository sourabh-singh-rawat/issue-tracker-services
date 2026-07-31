import { describe, it, expect, vi } from "vitest";
import { IdentityProviderUnavailableError, InvalidCredentialError } from "@/integrations/identity";
import { SignInService } from "./SignInService";

describe("SignInService", () => {
  const signInResult = {
    identity: { id: "identity-1", email: "a@b.com" },
    sessionId: "session-1",
    sessionToken: "session-token",
    expiresAt: new Date("2030-01-01T00:00:00.000Z"),
  };

  it("signs in with the identity provider and returns the result when no login challenge is provided", async () => {
    const identityProvider = {
      signIn: vi.fn().mockResolvedValue(signInResult),
    };
    const oauthProvider = {
      acceptLoginRequest: vi.fn(),
    };

    const service = new SignInService(identityProvider as never, oauthProvider as never);

    await expect(
      service.signInWithEmailAndPassword({ email: "a@b.com", password: "password" }),
    ).resolves.toEqual(signInResult);

    expect(identityProvider.signIn).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(oauthProvider.acceptLoginRequest).not.toHaveBeenCalled();
  });

  it("accepts the OAuth login request and returns redirectTo when a login challenge is provided", async () => {
    const identityProvider = {
      signIn: vi.fn().mockResolvedValue(signInResult),
    };
    const oauthProvider = {
      acceptLoginRequest: vi.fn().mockResolvedValue({
        redirectTo: "http://127.0.0.1:4444/oauth2/auth?login_verifier=abc",
      }),
    };

    const service = new SignInService(identityProvider as never, oauthProvider as never);

    await expect(
      service.signInWithEmailAndPassword({
        email: "a@b.com",
        password: "password",
        loginChallenge: "login-challenge-1",
      }),
    ).resolves.toEqual({
      ...signInResult,
      redirectTo: "http://127.0.0.1:4444/oauth2/auth?login_verifier=abc",
    });

    expect(identityProvider.signIn).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(oauthProvider.acceptLoginRequest).toHaveBeenCalledWith({
      challenge: "login-challenge-1",
      subject: "identity-1",
      identityProviderSessionId: "session-1",
    });
  });

  it("propagates invalid credential errors from the identity provider", async () => {
    const identityProvider = {
      signIn: vi.fn().mockRejectedValue(new InvalidCredentialError()),
    };
    const oauthProvider = {
      acceptLoginRequest: vi.fn(),
    };

    const service = new SignInService(identityProvider as never, oauthProvider as never);

    await expect(
      service.signInWithEmailAndPassword({ email: "a@b.com", password: "wrong" }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);

    expect(identityProvider.signIn).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "wrong",
    });
    expect(oauthProvider.acceptLoginRequest).not.toHaveBeenCalled();
  });

  it("propagates provider unavailable errors from the identity provider", async () => {
    const identityProvider = {
      signIn: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
    };
    const oauthProvider = {
      acceptLoginRequest: vi.fn(),
    };

    const service = new SignInService(identityProvider as never, oauthProvider as never);

    await expect(
      service.signInWithEmailAndPassword({ email: "a@b.com", password: "password" }),
    ).rejects.toBeInstanceOf(IdentityProviderUnavailableError);

    expect(identityProvider.signIn).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(oauthProvider.acceptLoginRequest).not.toHaveBeenCalled();
  });
});
