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

    const send = vi.fn((payload) => payload);
    const req = {
      headers: { authorization: "Bearer access-token-1" },
    };
    const reply = { send };

    const response = await getTokenSession.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.SessionService);
    expect(getSessionFromAccessToken).toHaveBeenCalledWith("access-token-1");
    expect(response).toEqual({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
      },
    });
  });

  it("throws InvalidCredentialError when the Authorization header is missing", async () => {
    const getSessionFromAccessToken = vi.fn();
    get.mockReturnValue({ getSessionFromAccessToken });

    const send = vi.fn();
    const req = {
      headers: {},
    };
    const reply = { send };

    await expect(getTokenSession.handler!(req as never, reply as never)).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(getSessionFromAccessToken).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});
