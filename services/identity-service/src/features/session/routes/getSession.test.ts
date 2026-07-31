import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

import { TYPES } from "@/bootstrap/container-types";
import { getSession } from "@/features/session/routes/getSession";
import { InvalidCredentialError } from "@/integrations/identity";

describe("getSession route", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("returns the identity for a valid session cookie", async () => {
    const getSessionFn = vi.fn().mockResolvedValue({
      id: "identity-1",
      email: "a@b.com",
      emailVerified: true,
    });
    get.mockReturnValue({ getSession: getSessionFn });

    const send = vi.fn((payload) => payload);
    const req = {
      cookies: { session: "session-token-1" },
    };
    const reply = { send };

    const response = await getSession.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.SessionService);
    expect(getSessionFn).toHaveBeenCalledWith("session-token-1");
    expect(response).toEqual({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
      },
    });
  });

  it("throws InvalidCredentialError when the session cookie is missing", async () => {
    const getSessionFn = vi.fn();
    get.mockReturnValue({ getSession: getSessionFn });

    const send = vi.fn();
    const req = {
      cookies: {},
    };
    const reply = { send };

    await expect(getSession.handler!(req as never, reply as never)).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(getSessionFn).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});
