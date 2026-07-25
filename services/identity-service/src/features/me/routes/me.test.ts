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

    const send = vi.fn((payload) => payload);
    const req = {
      cookies: { session: "session-token-1" },
    };
    const reply = { send };

    const response = await me.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.MeService);
    expect(getCurrentUser).toHaveBeenCalledWith("session-token-1");
    expect(response).toEqual({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
      },
    });
    expect(send).toHaveBeenCalledWith({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
      },
    });
  });

  it("throws InvalidCredentialError when the session cookie is missing", async () => {
    const getCurrentUser = vi.fn();
    get.mockReturnValue({ getCurrentUser });

    const send = vi.fn();
    const req = {
      cookies: {},
    };
    const reply = { send };

    await expect(me.handler!(req as never, reply as never)).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(getCurrentUser).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});
