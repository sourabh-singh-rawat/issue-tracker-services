import { describe, it, expect, vi } from "vitest";
import { IdentityProviderUnavailableError, InvalidCredentialError } from "@/integrations/identity";
import { MeService } from "./MeService";

describe("MeService", () => {
  it("returns the current user identity from the session service", async () => {
    const identity = {
      id: "identity-1",
      email: "a@b.com",
      emailVerified: true,
    };
    const sessionService = {
      getSession: vi.fn().mockResolvedValue(identity),
    };

    const service = new MeService(sessionService as never);

    await expect(service.getCurrentUser("session-token-1")).resolves.toEqual(identity);

    expect(sessionService.getSession).toHaveBeenCalledWith("session-token-1");
  });

  it("propagates invalid credential errors from the session service", async () => {
    const sessionService = {
      getSession: vi.fn().mockRejectedValue(new InvalidCredentialError()),
    };

    const service = new MeService(sessionService as never);

    await expect(service.getCurrentUser("session-token-1")).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(sessionService.getSession).toHaveBeenCalledWith("session-token-1");
  });

  it("propagates provider unavailable errors from the session service", async () => {
    const sessionService = {
      getSession: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
    };

    const service = new MeService(sessionService as never);

    await expect(service.getCurrentUser("session-token-1")).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );

    expect(sessionService.getSession).toHaveBeenCalledWith("session-token-1");
  });
});
