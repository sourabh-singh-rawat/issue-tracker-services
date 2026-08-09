import type { HttpRequest } from "@pine/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

vi.mock("@pine/security", () => ({
  JwtToken: {
    verify: vi.fn(),
  },
  hasUserIdentity: vi.fn(),
}));

import { JwtToken, hasUserIdentity } from "@pine/security";
import { TYPES } from "@/bootstrap/container-types";
import { InvalidCredentialError } from "@/features/me/errors";
import { me } from "@/features/me/routes/me";

function httpRequest(partial: Partial<HttpRequest>): HttpRequest {
  return {
    method: partial.method ?? "GET",
    url: partial.url ?? "/inventory/me",
    headers: partial.headers ?? {},
    query: partial.query ?? {},
    params: partial.params ?? {},
    cookies: partial.cookies ?? {},
    body: partial.body,
    file: partial.file ?? (async () => undefined),
  };
}

describe("me route", () => {
  beforeEach(() => {
    get.mockReset();
    vi.mocked(JwtToken.verify).mockReset();
    vi.mocked(hasUserIdentity).mockReset();
  });

  it("returns the current identity for a valid access token cookie", async () => {
    vi.mocked(JwtToken.verify).mockResolvedValue({
      userId: "identity-1",
      email: "a@b.com",
    });
    vi.mocked(hasUserIdentity).mockReturnValue(true);

    const getCurrentUser = vi.fn().mockResolvedValue({
      id: "identity-1",
    });
    get.mockReturnValue({ getCurrentUser });

    const response = await me.handler(
      httpRequest({
        cookies: { accessToken: "token-1" },
      }),
    );

    expect(get).toHaveBeenCalledWith(TYPES.MeService);
    expect(getCurrentUser).toHaveBeenCalledWith("identity-1");
    expect(response).toEqual({
      status: 200,
      body: {
        identity: {
          id: "identity-1",
        },
      },
    });
  });

  it("throws InvalidCredentialError when the access token cookie is missing", async () => {
    const getCurrentUser = vi.fn();
    get.mockReturnValue({ getCurrentUser });

    await expect(me.handler(httpRequest({ cookies: {} }))).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(getCurrentUser).not.toHaveBeenCalled();
  });
});
