import type { HttpRequest } from "@pine/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

import { TYPES } from "@/bootstrap/container-types";
import { me } from "@/features/me/routes/me";
import { InvalidCredentialError } from "@/integrations/identity";

function httpRequest(partial: Partial<HttpRequest>): HttpRequest {
  return {
    method: partial.method ?? "GET",
    url: partial.url ?? "/identity/me",
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
  });

  it("returns the current user identity for a valid session cookie", async () => {
    const getCurrentUser = vi.fn().mockResolvedValue({
      id: "identity-1",
      email: "a@b.com",
      emailVerified: true,
    });
    get.mockReturnValue({ getCurrentUser });

    const response = await me.handler(
      httpRequest({
        cookies: { session: "session-token-1" },
      }),
    );

    expect(get).toHaveBeenCalledWith(TYPES.MeService);
    expect(getCurrentUser).toHaveBeenCalledWith("session-token-1");
    expect(response).toEqual({
      status: 200,
      body: {
        identity: {
          id: "identity-1",
          email: "a@b.com",
          emailVerified: true,
        },
      },
    });
  });

  it("throws InvalidCredentialError when the session cookie is missing", async () => {
    const getCurrentUser = vi.fn();
    get.mockReturnValue({ getCurrentUser });

    await expect(me.handler(httpRequest({ cookies: {} }))).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(getCurrentUser).not.toHaveBeenCalled();
  });
});
