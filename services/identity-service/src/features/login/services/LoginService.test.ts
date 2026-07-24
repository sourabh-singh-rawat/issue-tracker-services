import { describe, it, expect, vi } from "vitest";
import { IdentityProviderUnavailableError, InvalidCredentialError } from "@/integrations/identity";
import { LoginService } from "./LoginService";

describe("LoginService", () => {
  it("logs in with the identity provider and returns the result", async () => {
    const loginResult = {
      identity: { id: "identity-1", email: "a@b.com" },
      sessionId: "session-1",
      sessionToken: "session-token",
    };
    const identityProvider = {
      login: vi.fn().mockResolvedValue(loginResult),
    };

    const service = new LoginService(identityProvider as never);

    await expect(service.loginWithEmailAndPassword("a@b.com", "password")).resolves.toEqual(
      loginResult,
    );

    expect(identityProvider.login).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
  });

  it("propagates invalid credential errors from the identity provider", async () => {
    const identityProvider = {
      login: vi.fn().mockRejectedValue(new InvalidCredentialError()),
    };

    const service = new LoginService(identityProvider as never);

    await expect(service.loginWithEmailAndPassword("a@b.com", "wrong")).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(identityProvider.login).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "wrong",
    });
  });

  it("propagates provider unavailable errors from the identity provider", async () => {
    const identityProvider = {
      login: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
    };

    const service = new LoginService(identityProvider as never);

    await expect(service.loginWithEmailAndPassword("a@b.com", "password")).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );

    expect(identityProvider.login).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
  });
});
