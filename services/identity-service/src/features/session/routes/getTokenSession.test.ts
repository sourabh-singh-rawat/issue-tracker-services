import type { HttpRequest } from "@pine/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

import { TYPES } from "@/bootstrap/container-types";
import { getTokenSession } from "@/features/session/routes/getTokenSession";
import { InvalidCredentialError } from "@/integrations/identity";

function httpRequest(partial: Partial<HttpRequest>): HttpRequest {
  return {
    method: partial.method ?? "GET",
    url: partial.url ?? "/identity/getTokenSession",
    headers: partial.headers ?? {},
    query: partial.query ?? {},
    params: partial.params ?? {},
    cookies: partial.cookies ?? {},
    body: partial.body,
    file: partial.file ?? (async () => undefined),
  };
}

describe("getTokenSession route", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("returns the identity for a valid bearer access token", async () => {
    const getSessionFromAccessToken = vi.fn().mockResolvedValue({
      id: "identity-1",
      email: "a@b.com",
      emailVerified: true,
    });
    get.mockReturnValue({ getSessionFromAccessToken });

    const response = await getTokenSession.handler(
      httpRequest({
        headers: { authorization: "Bearer access-token-1" },
      }),
    );

    expect(get).toHaveBeenCalledWith(TYPES.SessionService);
    expect(getSessionFromAccessToken).toHaveBeenCalledWith("access-token-1");
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

  it("throws InvalidCredentialError when the Authorization header is missing", async () => {
    const getSessionFromAccessToken = vi.fn();
    get.mockReturnValue({ getSessionFromAccessToken });

    await expect(getTokenSession.handler(httpRequest({ headers: {} }))).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(getSessionFromAccessToken).not.toHaveBeenCalled();
  });
});
