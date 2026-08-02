import { beforeEach, describe, expect, it, vi } from "vitest";
import { SessionService } from "@/features/session/services/SessionService";
import type { ISessionProvider, Identity } from "@/integrations/identity";
import { InvalidCredentialError } from "@/integrations/identity";
import type { IOAuthTokenProvider } from "@/integrations/oauth";

describe("SessionService", () => {
  const getSession = vi.fn();
  const introspectToken = vi.fn();
  const sessionProvider = { getSession } as unknown as ISessionProvider;
  const oauthTokenProvider = { introspectToken } as unknown as IOAuthTokenProvider;
  let service: SessionService;

  beforeEach(() => {
    getSession.mockReset();
    introspectToken.mockReset();
    service = new SessionService(sessionProvider, oauthTokenProvider);
  });

  it("returns the identity from the Kratos-backed session provider", async () => {
    const identity: Identity = {
      id: "id-1",
      email: "user@example.com",
      emailVerified: true,
    };
    getSession.mockResolvedValue(identity);

    await expect(service.getSession("token-1")).resolves.toEqual(identity);
    expect(getSession).toHaveBeenCalledWith("token-1");
  });

  it("returns the identity from an active OAuth access token", async () => {
    introspectToken.mockResolvedValue({
      active: true,
      subject: "subject-1",
      extra: { email: "oauth@example.com", email_verified: true },
    });

    await expect(service.getSessionFromAccessToken("access-token-1")).resolves.toEqual({
      id: "subject-1",
      email: "oauth@example.com",
      emailVerified: true,
    });
    expect(introspectToken).toHaveBeenCalledWith("access-token-1");
  });

  it("returns subject without email when token claims omit it", async () => {
    introspectToken.mockResolvedValue({
      active: true,
      subject: "subject-2",
    });

    await expect(service.getSessionFromAccessToken("access-token-2")).resolves.toEqual({
      id: "subject-2",
      email: "",
      emailVerified: undefined,
    });
  });

  it("throws when the access token is inactive", async () => {
    introspectToken.mockResolvedValue({ active: false });

    await expect(service.getSessionFromAccessToken("dead-token")).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("throws when the access token has no subject", async () => {
    introspectToken.mockResolvedValue({ active: true });

    await expect(service.getSessionFromAccessToken("no-sub")).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });
});
