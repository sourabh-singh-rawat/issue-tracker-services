import type { HttpRequest } from "@pine/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { get, verify, hasUserIdentity } = vi.hoisted(() => ({
  get: vi.fn(),
  verify: vi.fn(),
  hasUserIdentity: vi.fn(),
}));

vi.mock("@pine/security", () => ({
  JwtToken: { verify },
  hasUserIdentity,
}));

vi.mock("@/bootstrap/env", () => ({
  env: { JWT_SECRET: "test-secret" },
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
  TYPES: { SessionService: Symbol.for("ISessionService") },
}));

import { createContext, requireUserId } from "@/graphql/context";
import { InvalidCredentialError } from "@/integrations/identity";

const httpRequest = (cookies: Record<string, string | undefined>): HttpRequest => ({
  method: "POST",
  url: "/graphql",
  headers: {},
  query: {},
  params: {},
  cookies,
  body: {},
  file: async () => undefined,
});

describe("createContext", () => {
  beforeEach(() => {
    get.mockReset();
    verify.mockReset();
    hasUserIdentity.mockReset();
  });

  it("resolves the user from an access token cookie", async () => {
    verify.mockResolvedValue({ userId: "identity-1" });
    hasUserIdentity.mockReturnValue(true);

    const ctx = await createContext(httpRequest({ accessToken: "jwt-1" }));

    expect(verify).toHaveBeenCalledWith("jwt-1", "test-secret");
    expect(ctx.user).toEqual({ id: "identity-1", authMethod: "access_token" });
    expect(get).not.toHaveBeenCalled();
  });

  it("resolves the user from a session cookie", async () => {
    const getIdentityFromSessionToken = vi.fn().mockResolvedValue({
      id: "identity-2",
      email: "a@b.com",
      emailVerified: true,
    });
    get.mockReturnValue({ getIdentityFromSessionToken });

    const ctx = await createContext(httpRequest({ session: "session-1" }));

    expect(getIdentityFromSessionToken).toHaveBeenCalledWith("session-1");
    expect(ctx.user).toEqual({ id: "identity-2", authMethod: "session" });
  });

  it("returns no user when neither cookie is present", async () => {
    const ctx = await createContext(httpRequest({}));

    expect(ctx.user).toBeUndefined();
    expect(get).not.toHaveBeenCalled();
  });
});

describe("requireUserId", () => {
  it("returns the authenticated identity id", () => {
    expect(
      requireUserId({
        cookies: {},
        headers: {},
        user: { id: "identity-1", authMethod: "session" },
      }),
    ).toBe("identity-1");
  });

  it("throws InvalidCredentialError when the user is missing", () => {
    expect(() => requireUserId({ cookies: {}, headers: {} })).toThrow(InvalidCredentialError);
  });
});
