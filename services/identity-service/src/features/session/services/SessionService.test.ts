import { UserNotFoundError } from "@pine/common";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IIdentityService } from "@/features/identities/services/IIdentityService";
import { SessionService } from "@/features/session/services/SessionService";
import type { ISessionProvider, Identity } from "@/integrations/identity";
import { InvalidCredentialError } from "@/integrations/identity";
import type { IOAuthTokenProvider } from "@/integrations/oauth";

describe("SessionService", () => {
  const getSession = vi.fn();
  const introspectToken = vi.fn();
  const getIdentityByIdpId = vi.fn();
  const getIdentityById = vi.fn();
  const sessionProvider = { getSession } as unknown as ISessionProvider;
  const oauthTokenProvider = { introspectToken } as unknown as IOAuthTokenProvider;
  const identityService = {
    getIdentityByIdpId,
    getIdentityById,
  } as unknown as IIdentityService;
  let service: SessionService;

  beforeEach(() => {
    getSession.mockReset();
    introspectToken.mockReset();
    getIdentityByIdpId.mockReset();
    getIdentityById.mockReset();
    service = new SessionService(sessionProvider, oauthTokenProvider, identityService);
  });

  it("returns the local identity id for a Kratos-backed session", async () => {
    const idpIdentity: Identity = {
      id: "idp-1",
      email: "user@example.com",
      emailVerified: true,
    };
    getSession.mockResolvedValue(idpIdentity);
    getIdentityByIdpId.mockResolvedValue({
      id: "identity-1",
      idpId: "idp-1",
      idpProvider: "kratos",
    });

    await expect(service.getSession("token-1")).resolves.toEqual({
      id: "identity-1",
      email: "user@example.com",
      emailVerified: true,
    });
    expect(getSession).toHaveBeenCalledWith("token-1");
    expect(getIdentityByIdpId).toHaveBeenCalledWith("idp-1");
  });

  it("throws when no local identity exists for the IdP session", async () => {
    getSession.mockResolvedValue({
      id: "idp-missing",
      email: "missing@example.com",
    });
    getIdentityByIdpId.mockRejectedValue(new UserNotFoundError());

    await expect(service.getSession("token-1")).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it("returns the local identity from an active OAuth access token", async () => {
    introspectToken.mockResolvedValue({
      active: true,
      subject: "identity-1",
      extra: { email: "oauth@example.com", email_verified: true },
    });
    getIdentityById.mockResolvedValue({
      id: "identity-1",
      idpId: "idp-1",
      idpProvider: "kratos",
    });

    await expect(service.getSessionFromAccessToken("access-token-1")).resolves.toEqual({
      id: "identity-1",
      email: "oauth@example.com",
      emailVerified: true,
    });
    expect(introspectToken).toHaveBeenCalledWith("access-token-1");
    expect(getIdentityById).toHaveBeenCalledWith("identity-1");
  });

  it("returns subject without email when token claims omit it", async () => {
    introspectToken.mockResolvedValue({
      active: true,
      subject: "identity-2",
    });
    getIdentityById.mockResolvedValue({
      id: "identity-2",
      idpId: "idp-2",
      idpProvider: "kratos",
    });

    await expect(service.getSessionFromAccessToken("access-token-2")).resolves.toEqual({
      id: "identity-2",
      email: "",
      emailVerified: false,
    });
  });

  it("throws when the access token is inactive", async () => {
    introspectToken.mockResolvedValue({ active: false });

    await expect(service.getSessionFromAccessToken("dead-token")).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
    expect(getIdentityById).not.toHaveBeenCalled();
  });

  it("throws when the access token has no subject", async () => {
    introspectToken.mockResolvedValue({ active: true });

    await expect(service.getSessionFromAccessToken("no-sub")).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
    expect(getIdentityById).not.toHaveBeenCalled();
  });

  it("throws when the OAuth subject is not a known local identity", async () => {
    introspectToken.mockResolvedValue({
      active: true,
      subject: "unknown-identity",
    });
    getIdentityById.mockRejectedValue(new UserNotFoundError());

    await expect(service.getSessionFromAccessToken("access-token-3")).rejects.toBeInstanceOf(
      UserNotFoundError,
    );
  });
});
